export default function InsertLineBreak({ inputString }) {
  const charactersPerLine = 35;
  let outputString = "";

  for (let i = 0; i < inputString.length; i++) {
    outputString += inputString[i];
    if ((i + 1) % charactersPerLine === 0) {
      outputString += "\n"; // Add a line break after every 50 characters
    }
  }

  return (
    <div>
      <pre>{outputString}</pre>
    </div>
  );
}
