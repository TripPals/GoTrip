FROM ruby:2.7.4-alpine

RUN apk add --update --virtual \
runtime-deps \
postgresql-client \
build-base \
libxml2-dev \
libxslt-dev \
nodejs \
yarn \
libffi-dev \
readline \
build-base \
postgresql-dev \
libc-dev \
linux-headers \
readline-dev \
file \
imagemagick \
git \
tzdata \
&& rm -rf /var/cache/apk/*

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN yarn install
RUN bundle install

COPY . /app

ENTRYPOINT ["bin/rails"]
CMD ["s", "-b", "0.0.0.0"]

EXPOSE 3000