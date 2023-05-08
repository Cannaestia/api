import React, { useState } from 'react';

const Completion = () => {
  const [prompt, setPrompt] = useState('');
  const [maxTokens, setMaxTokens] = useState(60);
  const [output, setOutput] = useState('');

  const handleCompletionClick = () => {
    fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: maxTokens,
        n: 1,
        stop: null,
      }),
    })
    .then((response) => {
      console.log(response); // check the response object
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // check the parsed JSON data
      setOutput(data.choices[0].text);
    })
    .catch((error) => {
      console.error(error);
      setOutput(`Error: ${error.message}`);
    });
    

  };
  

  return (
    <div>
      <h1>OpenAI Completion API Test</h1>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <br />
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="maxTokens">Max Tokens:</label>
        <br />
        <input
          type="number"
          id="maxTokens"
          value={maxTokens}
          onChange={(e) => setMaxTokens(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleCompletionClick}>Complete</button>
      {output && (
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default Completion;





