# VidBrief

VidBrief is a web application built with Next.js that allows users to input YouTube video URLs and receive a summary of the video content. This can be particularly useful for users who want to get the gist of a video without watching the entire content.

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/d26add0e-801d-4224-bf74-3d3c8cb9461d)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/26c6e7ef-057b-41e9-907c-7bccba907828)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/39b492d6-8f74-4b49-9e2e-fb457e2ecba6)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/7b1b77b6-9c0e-4164-8f99-55b5195214b5)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/e0e2f1db-40a5-4d22-ab14-5de0221fc4f0)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/4f46a00d-a054-432b-a452-f7cddbef5635)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/86cfb085-ec5b-49f3-8a0f-5e0cd2cedc18)

![image](https://github.com/123Brijesh44aa/vidbrief/assets/83857442/3127ea93-8437-4f0d-84c1-c73c75e88d25)


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Input YouTube video URLs and generate summaries of the video content.
- User-friendly interface built with Next.js.
- API integration to process and summarize video content.

## Demo

You can see a live demo of VidBrief [here](https://your-vercel-domain.vercel.app).

## Installation

To run VidBrief locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/123Brijesh44aa/vidbrief.git
    cd VidBrief
    cd vid-brief
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Input a YouTube URL:**

    On the home page, enter the URL of the YouTube video you want to summarize.

2. **Get the summary:**

    After submitting the URL, VidBrief will process the video and provide a summary of its content.

## API

VidBrief includes a custom API for processing YouTube videos. The API endpoint is located at `/api`.

### Example Request

To use the API, make a GET request to `/api` with the `yt-url` parameter.

```javascript
const yt_url = 'https://www.youtube.com/watch?v=example';
const apiResponse = await fetch(`/api?yt-url=${yt_url}`, {
    method: 'GET',
    cache: 'no-cache',
});
