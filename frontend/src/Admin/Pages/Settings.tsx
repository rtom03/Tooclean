const Settings = () => (
  <div>
    <h1 className="text-xl font-black text-[#1a1a1a] mb-5">Settings</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Profile */}
      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#e8e8e8]">
          <p className="text-[13px] font-bold">Admin profile</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              defaultValue="Admin"
              className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@tooclean.com"
              className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
        </div>
        <div className="px-5 py-3.5 border-t border-[#e8e8e8] flex justify-end">
          <button className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80">
            Save changes
          </button>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#e8e8e8]">
          <p className="text-[13px] font-bold">Change password</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {["Current password", "New password", "Confirm password"].map(
            (label) => (
              <div key={label}>
                <label className="block text-[11px] font-bold uppercase tracking-[0.06em] text-[#555] mb-1.5">
                  {label}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
            ),
          )}
        </div>
        <div className="px-5 py-3.5 border-t border-[#e8e8e8] flex justify-end">
          <button className="bg-[#1a1a1a] text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:opacity-80">
            Update password
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
