FROM python:3
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["gunicorn", "-w", "2", "-t", "3600", "-b", ":8080", "app:app"]
