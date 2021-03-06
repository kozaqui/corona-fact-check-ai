import glob
import pickle
import re
import string
import sys

import pandas as pd
from gensim import corpora, models, similarities

PUNCTUATION = '[' + re.escape(''.join(set(string.punctuation).union([' ', '\t']).difference(['-', '_', '']))) + ']'
TEXT_TRANSLATE_TABLE = dict.fromkeys(i for i in range(sys.maxunicode) if chr(i) in PUNCTUATION)


def clean_word(word):
    return word.lower().translate(TEXT_TRANSLATE_TABLE)


def load_articles(dir='./'):
    articles = {}
    for fn in glob.glob(dir + '*.pkl'):
        with open(fn, 'rb') as f:
            articles.update(pickle.load(f))
    return articles


def build_model(articles):
    texts = []
    to_remove = []
    for url, art in articles.items():
        text = art['text']
        text = text.replace('\n', '')
        words = re.split(PUNCTUATION, text)
        text = [clean_word(w) for w in words if len(w) > 2]
        if 'coronavirus' in text or 'covid' in text or 'covid-19' in text or 'virus' in text:
            texts.append(text)
        else:
            to_remove.append(url)

    for u in to_remove:
        del articles[u]

    stop_words = ['http', 'https', 'unicef', 'nih', 'facebook', 'google', 'you', 'your', 'www', 'email', 'twitter']
    dictionary = corpora.Dictionary(texts)
    dictionary.filter_extremes(no_below=10, no_above=0.4)
    dictionary.filter_tokens(bad_ids=list(map(lambda w: dictionary.token2id[w],
                                              filter(lambda w: w in dictionary.token2id,
                                                     stop_words))))

    tfidf = models.TfidfModel(dictionary=dictionary, normalize=True)
    corpus = [tfidf[dictionary.doc2bow(text)] for text in texts]
    lsi = models.LsiModel(corpus=corpus, id2word=dictionary, num_topics=50)
    index = similarities.MatrixSimilarity(lsi[corpus])
    return {
        'articles': articles,
        'dictionary': dictionary,
        'tfidf': tfidf,
        'lsi': lsi,
        'index': index
    }


model = build_model(load_articles())


def validate_text(query, threshold=0.5):
    query_text = re.split(PUNCTUATION, query)
    query_text = [clean_word(w) for w in query_text]

    vec_bow = model['dictionary'].doc2bow(query_text)
    vec_lsi = model['lsi'][model['tfidf'][vec_bow]]  # convert the query to LSI space
    sims = model['index'][vec_lsi]
    vv = pd.Series(sims, index=list(model['articles'].keys()))

    url_similarities = []
    urls = []
    validated_text = ''

    for name in vv.sort_values(ascending=False).index[:10]:
        rel = vv.loc[name]
        if rel > threshold:
            urls.append(name)
            url_similarities.append(rel)
            validated_text += name + '\n' + (model['articles'][name]['summary']) + '\n'
    result = {
        "original_text": query,
        "is_related": len(url_similarities) > 0,
        "reliability": sum(url_similarities[:3]) / len(url_similarities[:3]) if len(url_similarities) > 0 else 0,
        "sources": urls,
        "validated_text": validated_text,
    }
    return result


if __name__ == '__main__':
    import json
    import sys

    resp = validate_text(sys.argv[1])
    with open(sys.argv[2], 'w') as f:
        json.dump(resp, f, indent=4)
