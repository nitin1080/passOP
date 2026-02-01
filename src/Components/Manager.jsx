import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function Manager() {
  const [eye, setEye] = useState("fa-solid fa-eye-slash");
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [pass, setPass] = useState("password");

  const getPasswords=async()=>{
    let req=await fetch("http://localhost:3000/");
    let passwords=await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async() => {
    const newEntry = { ...form, id: uuidv4() };
    if(form.site.length===0||form.password.length==0||form.username.length==0){
      alert("Enter valid Entry!");
    }else{
      const updatedArray = [...passwordArray, newEntry];
      setPasswordArray(updatedArray);
      await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/JSON"},
      body:JSON.stringify({...form,id:uuidv4()})});
      setForm({ site: "", username: "", password: "" });
    }
  };

  const showPassword = () => {
    if (eye.includes("fa-eye-slash")) {
      setEye("fa-solid fa-eye");
      setPass("text");
    } else {
      setEye("fa-solid fa-eye-slash");
      setPass("password");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyText = (text) => {
    toast.info(`Copied to clipboard: ${text}`, {
      position: "bottom-left",
      autoClose: 3000,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const deletePassword = async(id) => {
    const updated = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updated);
    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/JSON"},
    body:JSON.stringify({id})});
  };

  const editPassword = async(id) => {
    const item = passwordArray.find((i) => i.id === id);
    setForm(item);
    setPasswordArray(passwordArray.filter((i) => i.id !== id));
    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/JSON"},
    body:JSON.stringify({id})});
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-3 sm:px-6 relative overflow-hidden">
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
      [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-1">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </h1>
      <p className="text-green-800 text-center mb-5 text-base sm:text-lg">
        Your own Password Manager
      </p>

      {/* Input Section */}
      <div className="flex flex-col gap-4 items-center w-full max-w-[95%] sm:max-w-xl md:max-w-3xl">
        <input
          value={form.site}
          name="site"
          onChange={handleChange}
          placeholder="Enter Website URL"
          type="text"
          className="rounded-full border border-green-500 px-4 py-2 w-full"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            type="text"
            name="username"
            className="rounded-full border border-green-500 px-4 py-2 w-full"
          />
          <div className="relative w-full">
            <input
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              type={pass}
              name="password"
              className="rounded-full border border-green-500 px-4 py-2 w-full pr-8"
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-black"
              onClick={showPassword}
            >
              <i className={eye}></i>
            </span>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="flex justify-center items-center gap-2 bg-green-500 text-white 
          font-semibold text-lg hover:bg-green-600 rounded-full px-5 py-2 mt-1 transition-all"
        >
          <i className="fa-solid fa-plus"></i>Add Password
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-8 w-full max-w-[95%] sm:max-w-3xl overflow-x-auto">
        <h2 className="font-bold text-xl pb-2 text-center sm:text-left">Your Passwords</h2>

        {passwordArray.length === 0 ? (
          <div className="text-center text-gray-600">No Passwords to Show</div>
        ) : (
          <table className="table-auto w-full min-w-[500px] border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-3">Site</th>
                <th className="py-2 px-3">Username</th>
                <th className="py-2 px-3">Password</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item) => (
                <tr key={item.id} className="border-b border-green-300">
                  <td className="py-2 px-2 text-center">
                    <a
                      href={item.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline break-all"
                    >
                      {item.site}
                    </a>
                    <span
                      onClick={() => copyText(item.site)}
                      className="ml-2 cursor-pointer text-gray-600 hover:text-black"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center break-all">{item.username}
                    <span
                      onClick={() => copyText(item.username)}
                      className="ml-2 cursor-pointer text-gray-600 hover:text-black"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center break-all">{"&".repeat(item.password.length)}
                    <span
                      onClick={() => copyText(item.password)}
                      className="ml-2 cursor-pointer text-gray-600 hover:text-black"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span
                      onClick={() => editPassword(item.id)}
                      className="mx-1.5 cursor-pointer text-blue-700 hover:text-blue-900"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </span>
                    <span
                      onClick={() => deletePassword(item.id)}
                      className="mx-1.5 cursor-pointer text-red-700 hover:text-red-900"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
