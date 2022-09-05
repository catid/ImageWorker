#!/bin/sh

# This script rebuilds the webapp and deploys it to nginx

(cd webapp && npm run build)

sudo cp -R webapp/build/* /var/www/html/
