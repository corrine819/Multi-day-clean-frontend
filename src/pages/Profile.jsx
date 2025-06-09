import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const ACCENT_PALETTE = [
  { name: 'Forest Green', value: '#228B22' },
  { name: 'Plum', value: '#8E4585' },
  { name: 'Coral', value: '#FF6F61' },
  { name: 'Light Blue', value: '#87CEFA' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Tan', value: '#D2B48C' },
  { name: 'Slate Blue', value: '#6A5ACD' },
  { name: 'Sunset', value: '#FDB813' }
];

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    birth_date: '',
    gender: '',
    goal: '',
    theme: 'system',
    accent_color: ACCENT_PALETTE[0].value,
    photo_url: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        updateTheme(data.theme);
        updateAccent(data.accent_color);
      })
      .catch(err => console.error('Error loading profile:', err));
  }, []);

  const updateTheme = (theme) => {
    document.body.classList.remove('light', 'dark');
    if (theme === 'light' || theme === 'dark') {
      document.body.classList.add(theme);
    } else {
      // system default → remove both classes
      document.body.classList.remove('light', 'dark');
    }
  };

  const updateAccent = (color) => {
    document.documentElement.style.setProperty('--accent-color', color);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setProfile({ ...profile, theme: newTheme });
    updateTheme(newTheme);
  };

  const handleAccentChange = (color) => {
    setProfile({ ...profile, accent_color: color });
    updateAccent(color);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/update_profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success('Profile saved!');
    } catch (err) {
      toast.error('Failed to save profile');
      console.error(err);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_URL}/upload_profile_photo`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setProfile({ ...profile, photo_url: data.url });
      toast.success('Profile picture uploaded!');
    } catch (err) {
      toast.error('Failed to upload photo');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow space-y-6">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold">👤 Edit Profile</h2>

      {/* Line 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label>Name:</label>
          <input name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Birth Date:</label>
          <input type="date" name="birth_date" value={profile.birth_date} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-binary</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Line 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label>Personal Goal:</label>
          <select name="goal" value={profile.goal} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="flexibility">Flexibility</option>
            <option value="performance">Performance</option>
          </select>
        </div>
        <div>
          <label>Theme Mode:</label>
          <select name="theme" value={profile.theme} onChange={handleThemeChange} className="w-full p-2 border rounded">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label>Accent Color:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ACCENT_PALETTE.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-10 h-10 rounded-full border-4 ${
                  profile.accent_color === color.value ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleAccentChange(color.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Line 3 */}
      <div>
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {profile.photo_url && <img src={profile.photo_url} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover" />}
      </div>

      {/* Save button */}
      <button onClick={handleSave} className="bg-[var(--accent-color)] text-white px-4 py-2 rounded hover:opacity-90 transition">
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
