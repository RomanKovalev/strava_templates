FROM python:3.10
ENV PYTHONUNBUFFERED 1
ARG DEBIAN_FRONTEND=noninteractive

#RUN apt-get clean && apt-get update
#RUN apt-get install -y gnumeric


RUN mkdir /app
WORKDIR /app

ADD requirements.txt /app/
RUN pip install -r requirements.txt
ADD . /app/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
