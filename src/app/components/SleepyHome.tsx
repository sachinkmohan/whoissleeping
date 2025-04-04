import { useState, useEffect } from "react";
const SleepyHome = () => {
  const [michiganTime, setMichiganTime] = useState("");
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const updateMichiganTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Detroit",
        hour: "2-digit",
        minute: "2-digit",
      };
      // Changed to toLocaleTimeString to format time correctly
      const timeString = now.toLocaleTimeString("en-US", options); // Fixed type error by specifying the correct types
      setMichiganTime(timeString);
      setCurrentHour(now.getHours());
    };
    updateMichiganTime();
    const intervalId = setInterval(updateMichiganTime, 60000);
    console.log('what is here')
    return () => clearInterval(intervalId);

  }, []);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1>Who is sleeping? 😴</h1>
      <div>
        <div>
          <label htmlFor="michigan-timezone" className="block">
            Michigan Time Zone
          </label>
          <select
            id="michigan-timezone"
            className="mt-1 w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
          >
            <option value="EST">EST</option>
            <option value="EDT">EDT</option>
          </select>

          <p>{michiganTime}</p>

          {/* Time Block from 12-12 with 24 sections */}
          <div className="flex mt-8 w-full max-w-4xl">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-16 border ${
                  currentHour === index ? "bg-red-500" : "bg-gray-200"
                }`}
              >
                <span className="block text-center text-black">{index}</span>
              </div>
            ))}
          </div>

          <label htmlFor="german-timezone" className="block">
            German Time Zone
          </label>
          <select
            id="german-timezone"
            className="mt-1 w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md"
          >
            <option value="CET">CET</option>
            <option value="CEST">CEST</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SleepyHome;
