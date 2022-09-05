from setuptools import setup, find_packages

setup(
    name='ml-manager',
    version='0.0.1',
    description='',
    packages=find_packages(),
    install_requires=[
        'numpy',
        'tornado',
        'celery'
    ],
)
