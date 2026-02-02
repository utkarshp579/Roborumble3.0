"use client";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const RegistrationForm = () => {
  const neonGreen = "#00ff9f";

  // --- STATES ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState(""); // Backend se aaya OTP store karne ke liye
  const [timer, setTimer] = useState(0); // Resend timer

  const [leader, setLeader] = useState({
    name: "", email: "", phone: "", college: "", course: "", password: ""
  });

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const eventsList = [
    { id: 1, name: "Robo War", price: 400 },
    { id: 2, name: "Robo Soccer", price: 400 },
    { id: 3, name: "Pick And Place", price: 400 },
    { id: 4, name: "Robo Obstacle", price: 400 },
    { id: 5, name: "Aeromodelling", price: 400 },
    { id: 6, name: "E Sports", price: 250 },
    { id: 7, name: "Exhibition", price: 250 },
    { id: 8, name: "Defence Talk", price: 0 },
    { id: 9, name: "Defence Expo", price: 0 },
    { id: 10, name: "Line Following Robot", price: 400 },
  ];

  // Timer logic for Resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- HELPER: CLOUDINARY UPLOAD ---
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  // --- LOGIC FUNCTIONS ---

  // REAL OTP SEND FUNCTION
  const handleSendOtp = async () => {
    if (!leader.email) return alert("Please enter email first!");

    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leader.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setServerOtp(data.otp); // Humne backend se OTP mangwaya (sirf development ke liye, production me ye hidden rahega)
        setTimer(60); // 60 seconds timer
        alert(`OTP has been sent to ${leader.email}`);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Error connecting to OTP server!");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndProceed = () => {
    // String conversion for safe comparison
    if (otp.toString() !== serverOtp.toString()) {
      return alert("Invalid OTP! Please check your email.");
    }
    setStep(2);
  };

  // Team Logic
  const addMember = () => {
    if (members.length + 1 >= 5) return alert("Max 5 members!");
    setMembers([...members, { name: "", email: "", phone: "", course: "" }]);
  };

  const updateMember = (index, field, value) => {
    const list = [...members];
    list[index][field] = value;
    setMembers(list);
  };

  const removeMember = (index) => {
    const list = [...members];
    list.splice(index, 1);
    setMembers(list);
  };

  const toggleEvent = (event) => {
    if (selectedEvents.find((e) => e.id === event.id)) {
      setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const totalAmount = selectedEvents.reduce((sum, e) => sum + e.price, 0);
  const upiString = `upi://pay?pa=college@upi&pn=RoboRumble&am=${totalAmount}&tn=Reg-${teamName}`;

  // FINAL SUBMIT
  const handleSubmit = async () => {
    if (totalAmount > 0 && (!transactionId || !screenshot)) {
      return alert("Please complete payment details!");
    }
    if (!teamName) return alert("Please enter Team Name");

    setLoading(true);
    try {
      let imageUrl = "";
      if (screenshot) {
        imageUrl = await uploadToCloudinary(screenshot);
      }

      const registrationData = {
        leader,
        teamName,
        members,
        selectedEvents: selectedEvents.map(e => e.name),
        totalAmount,
        transactionId,
        screenshotUrl: imageUrl
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setStep(3);
      } else {
        alert("Registration failed in database!");
      }
    } catch (error) {
      alert("Something went wrong with the server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#0a101f]/80 backdrop-blur-2xl p-6 md:p-10 rounded-2xl border shadow-2xl mt-28 md:mt-32 mb-10 animate-fade-in relative z-20 mx-auto"
      style={{ borderColor: `${neonGreen}50`, boxShadow: `0 0 40px -5px ${neonGreen}20` }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6" style={{ color: neonGreen, textShadow: `0 0 20px ${neonGreen}60` }}>
          {step === 1 && "Leader Registration"}
          {step === 2 && "Team & Events"}
          {step === 3 && "Dashboard"}
        </h1>
        <div className="flex justify-center gap-3">
          <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: step >= 1 ? neonGreen : '#374151' }}></div>
          <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: step >= 2 ? neonGreen : '#374151' }}></div>
          <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: step >= 3 ? neonGreen : '#374151' }}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeonInput label="Full Name" placeholder="Enter Name" val={leader.name} setVal={(v) => setLeader({ ...leader, name: v })} color={neonGreen} />
            <NeonInput label="Phone Number" placeholder="+91 XXXXX" val={leader.phone} setVal={(v) => setLeader({ ...leader, phone: v })} color={neonGreen} />
            <NeonInput label="College Name" placeholder="Enter Institute Name" val={leader.college} setVal={(v) => setLeader({ ...leader, college: v })} color={neonGreen} />
            <NeonInput label="Course/Class" placeholder="B.Tech / 12th" val={leader.course} setVal={(v) => setLeader({ ...leader, course: v })} color={neonGreen} />
            <NeonInput label="Password" type="password" placeholder="******" val={leader.password} setVal={(v) => setLeader({ ...leader, password: v })} color={neonGreen} />
          </div>

          {/* ASLI EMAIL VERIFICATION SECTION */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl mt-6">
            <label className="text-gray-300 text-sm font-bold mb-3 block uppercase tracking-wide">Email Verification</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input type="email" placeholder="leader@email.com" value={leader.email} onChange={(e) => setLeader({ ...leader, email: e.target.value })} disabled={otpSent && timer > 0} className="flex-1 bg-[#151f32] text-white border border-slate-600 rounded-lg px-5 py-4 outline-none" />
              {(!otpSent || timer === 0) && (
                <button onClick={handleSendOtp} disabled={loading} className="px-8 py-3 font-bold text-black rounded-lg uppercase tracking-wide" style={{ backgroundColor: neonGreen }}>
                  {loading ? "..." : otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              )}
              {timer > 0 && <span className="text-yellow-500 font-mono flex items-center">Wait {timer}s</span>}
            </div>

            {otpSent && (
              <div className="mt-4 flex gap-3 animate-fade-in-down">
                <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-32 bg-[#151f32] text-center text-white border border-slate-600 rounded-lg px-4 py-3 outline-none" />
                <button onClick={verifyAndProceed} className="flex-1 py-3 font-bold text-black rounded-lg uppercase" style={{ backgroundColor: neonGreen }}>Verify & Next</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rest of Step 2 and Step 3 remain same as your code */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
          <NeonInput label="Team Name" placeholder="e.g. Cyber Squad" val={teamName} setVal={setTeamName} color={neonGreen} />
          <div className="bg-slate-800/40 border border-dashed border-slate-600 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-200">Team Members <span className="text-sm text-cyan-400 ml-2">({members.length + 1}/5)</span></h3>
              {members.length < 4 && <button onClick={addMember} className="text-xs bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white border border-slate-500 transition">+ Add Member</button>}
            </div>
            <div className="space-y-4">
              {members.map((m, i) => (
                <div key={i} className="relative bg-[#151f32] p-5 rounded-lg border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <span onClick={() => removeMember(i)} className="absolute top-2 right-3 text-xs text-red-400 cursor-pointer font-bold uppercase">Remove</span>
                  <input placeholder="Name" value={m.name} onChange={(e) => updateMember(i, 'name', e.target.value)} className="bg-slate-800/50 p-3 rounded border border-slate-600 text-sm text-white outline-none" />
                  <input placeholder="Phone" value={m.phone} onChange={(e) => updateMember(i, 'phone', e.target.value)} className="bg-slate-800/50 p-3 rounded border border-slate-600 text-sm text-white outline-none" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-200 mb-4">Select Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsList.map((ev) => (
                <div key={ev.id} onClick={() => toggleEvent(ev)} className={`p-5 rounded-lg cursor-pointer border flex justify-between items-center transition-all ${selectedEvents.find(e => e.id === ev.id) ? `bg-green-900/20` : 'bg-[#151f32] border-slate-700'}`} style={{ borderColor: selectedEvents.find(e => e.id === ev.id) ? neonGreen : '#334155' }}>
                  <span className="font-bold text-lg" style={{ color: selectedEvents.find(e => e.id === ev.id) ? neonGreen : '#d1d5db' }}>{ev.name}</span>
                  <span className="text-gray-400 font-mono">₹{ev.price}</span>
                </div>
              ))}
            </div>
          </div>
          {totalAmount > 0 && (
            <div className="bg-[#151f32] p-8 rounded-xl border border-slate-700">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="bg-white p-4 rounded-xl"><QRCode value={upiString} size={140} /></div>
                <div className="flex-1 w-full space-y-5">
                  <div>
                    <span className="text-gray-400 text-sm uppercase">Total Amount: <span className="text-5xl font-black text-white ml-2">₹ {totalAmount}</span></span>
                  </div>
                  <NeonInput label="Transaction ID (UTR)" placeholder="12-digit UTR" val={transactionId} setVal={setTransactionId} color={neonGreen} />
                  <input type="file" onChange={(e) => setScreenshot(e.target.files[0])} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-sm text-gray-400" />
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <button onClick={() => setStep(1)} className="px-8 py-3 rounded-lg text-gray-400 font-bold uppercase">Back</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 py-4 rounded-lg font-black uppercase tracking-widest text-lg shadow-lg" style={{ backgroundColor: neonGreen, color: '#002a1b' }}>
              {loading ? "Processing..." : "Complete Registration"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto mb-8 bg-green-500/10" style={{ borderColor: neonGreen }}>
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-gray-400 mb-12">Welcome to the future, Team <span style={{ color: neonGreen }}>{teamName}</span></p>
          <button onClick={() => window.location.reload()} className="mt-16 text-gray-500 hover:text-white underline uppercase text-sm">Register Another Team</button>
        </div>
      )}
    </div>
  );
};

const NeonInput = ({ label, placeholder, type = "text", val, setVal, color }) => (
  <div className="w-full">
    <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase text-[10px] md:text-xs">{label}</label>
    <input type={type} placeholder={placeholder} value={val} onChange={(e) => setVal(e.target.value)} className="w-full bg-[#151f32] text-white border border-slate-700 rounded-lg px-5 py-4 focus:outline-none focus:border-[#00ff9f] transition-all" />
  </div>
);

export default RegistrationForm;