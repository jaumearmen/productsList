FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /timbal

RUN apt update && \
    apt install -yqq --no-install-recommends \
        curl \
        ca-certificates \
        git \
        unzip \
        ripgrep \
        vim && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | BUN_INSTALL="/root/.local" bash

RUN echo 'export PATH="/root/.local/bin:$PATH"' >> ~/.bashrc
ENV PATH="/root/.local/bin:$PATH"

COPY . /timbal

RUN cd /timbal && bun install && bun run build

CMD ["bun", "run", "dev"]
