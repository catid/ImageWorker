# ImageWorker

Work queue system for running ML inference to generate images in Python on a cluster of Linux computers each with multiple Nvidia GPUs.

## Overview

We h

## Prerequisites

We are using Celery which only supports Linux.  Also I have only tested this on Nvidia GPUs and Ubuntu.

Each worker needs conda installed: https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html

The Nvidia CUDA drivers need to be installed.  I'm using the Ubuntu 515 driver package because it is easy to get going and seems to work well.

Any prerequisites like Python3 need to be installed using `apt install`.

Each node needs a `rabbit-mq` server running.  I got it installed by running `bash install_rabbitmq.sh`

The master server should run nginx web server: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

## Worker setup

Create `worker` conda environment:
```
conda env create -f environment.yaml
```
or easier to remember:
```
bash ./install_environment.sh
```

Activate `worker` conda environment:
```
conda activate worker
```

Run worker Python script:
```
python worker.py
```

The master node should run the front-end API:
```
python master.py
```

The master node should also run the website.

