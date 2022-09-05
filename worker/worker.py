from celery import Celery

app = Celery('worker', broker='amqp://guest@localhost//')

@app.task
def generate(prompt):
    return 'test'
