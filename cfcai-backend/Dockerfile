FROM python:3
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["gunicorn", "-w", "2", "-t", "3600", "-b", ":5000", "app:app"]
