const sleep = (t = Math.random() * 200 + 300) =>
  new Promise((resolve) => setTimeout(resolve, t));

export default sleep;
