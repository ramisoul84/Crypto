import "./conv.css";
const Conv = () => {
  return (
    <section id="conv">
      <form>
        <select id="convFrom" name="conv" required>
          <option value="">--Choose an method--</option>
          <option value="des">Text</option>
          <option value="des3">Hex</option>
          <option value="aes128">Binary</option>
          <option value="aes192">Decimal</option>
          <option value="aes256">Decimal to Hex</option>
        </select>
        &rArr;
        <select id="convTo" name="conv" required>
          <option value="">--Choose an method--</option>
          <option value="des">Text to Hexadecimal</option>
          <option value="des3">Text to Binary</option>
          <option value="aes128">Hexa to Binary</option>
          <option value="aes192">Decimal to Binary</option>
          <option value="aes256">Decimal to Hex</option>
        </select>
        <textarea />
        <p></p>
        <textarea />
      </form>
      <button>Convert</button>
    </section>
  );
};
export default Conv;
