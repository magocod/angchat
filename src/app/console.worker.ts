/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
	console.log('worker data', data);
  const response = `worker response to ${data}`;
  postMessage(response);
});
