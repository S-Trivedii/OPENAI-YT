const openai = require("../config/openaiConfig");

// a function to generate a description based on title
const generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Come up with a description for a YouTube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  console.log(description.data.choices[0].message);

  const tags = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `come up with 10 keywords for a YouTube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  // console.log(tags.data.choices[0].message);

  res.status(200).json({
    description: description.data.choices[0].message,
    tags: tags.data.choices[0].message,
  });
};

// a function to generate a image based on desc
const generateImage = async (req, res) => {
  const image = await openai.createImage({
    prompt: req.res.prompt,
    n: 1, // no. of images
    size: "1024x1024",
  });

  // console.log(image.data.data[0].url);

  res.json({
    url: image.data.data[0].url,
  });
};

module.exports = { generateMeta, generateImage };
