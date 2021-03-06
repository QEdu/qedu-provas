FROM qedu/qedu-provas-base-front-infra:release-2.0.0

WORKDIR "/var/www"
USER root

ADD . /var/www

RUN  chown -R node:node /var/www

ARG ENVIRONMENT

RUN cd /var/www &&\
    yarn &&\
    yarn build:${ENVIRONMENT} &&\
    rm -fr src test mock build provision e2e

CMD yarn start

FROM alpine:3.8

USER root
WORKDIR "/var/www"

ENV YARN_VERSION 1.6.0
ENV NODE_VERSION 8.9.4
ENV PM2_VERSION 2.4.2

RUN apk update && apk add \
    wget \
    nodejs

RUN cd /tmp && \
    wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz &&\
    tar -xzf node-v${NODE_VERSION}-linux-x64.tar.gz && \
    ln -s /tmp/node-v${NODE_VERSION}-linux-x64/bin/node /usr/local/bin/ && \
    ln -s /tmp/node-v${NODE_VERSION}-linux-x64/bin/npm /usr/local/bin/ && \
    ln -s /tmp/node-v${NODE_VERSION}-linux-x64/bin/npx /usr/local/bin/ && \
    rm node-v${NODE_VERSION}-linux-x64.tar.gz && \
    npm i -g npm && \
    npm i -g yarn@$YARN_VERSION &&\
    npm i -g pm2@$PM2_VERSION

COPY --from=0 /var/www . 

CMD yarn start
