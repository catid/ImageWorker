#!/usr/bin/sh

# The scripts from rabbitmq website did not work, but this did:

# Install erlang
curl -fsSL https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb http://dl.bintray.com/rabbitmq-erlang/debian xenial erlang-22.x" >  | sudo tee  /etc/apt/sources.list.d/bintray.erlang.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y erlang-base \
                    erlang-asn1 erlang-crypto erlang-eldap erlang-ftp erlang-inets \
                    erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key \
                    erlang-runtime-tools erlang-snmp erlang-ssl \
                    erlang-syntax-tools erlang-tftp erlang-tools erlang-xmerl

# Install rabbitmq-server
sudo apt-get install curl gnupg -y
curl -fsSL https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo "deb https://dl.bintray.com/rabbitmq/debian xenial main" | sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list
sudo apt-get update -y
sudo apt-get install -y rabbitmq-server

# Run rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
