import { useState, useEffect } from "react";
const Asymmetric = () => {
  const [val, setVal] = useState(false);
  const [data, setData] = useState({
    key: "",
    pt: "",
  });
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const valid = () => {
    const sub = document.getElementById("sub");
    const inp = document.getElementById("inp");

    if (inp.checkValidity()) {
      sub.disabled = false;
    } else sub.disabled = true;
    setVal(inp.checkValidity());
    console.log(inp.checkValidity());
  };
  useEffect(valid, [data.key]);
  return (
    <section>
      <form>
        <label>Name</label>
        <input
          id="inp"
          type="text"
          name="key"
          onChange={changeHandle}
          autocomplete="off"
          pattern="[0-9A-Fa-f]{16,16}"
        />
        <input
          type="text"
          name="pt"
          onChange={changeHandle}
          autocomplete="off"
        />
        <input type="submit" id="sub" disabled />
      </form>
      <p>{data.key.length - 16}</p>
      <p>{val}</p>
    </section>
  );
};
export default Asymmetric;
