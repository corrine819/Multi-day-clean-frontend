import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    birth_date: '',
    gender: '',
    goal: '',
    theme: '',
    accent_color: '',
    photo_url: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/get_profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Error loading profile:', err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">👤 Edit Profile</h2>

      <div className="space-y-4">
        <label>Name:</label>
        <input name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded" />

        <label>Birth Date:</label>
        <input type="date" name="birth_date" value={profile.birth_date} onChange={handleChange} className="w-full p-2 border rounded" />

        <label>Gender:</label>
        <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>

        <label>Goal:</label>
        <select name="goal" value={profile.goal} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Goal</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="flexibility">Flexibility</option>
          <option value="performance">Performance</option>
        </select>

        <label>Theme:</label>
        <select name="theme" value={profile.theme} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">System Default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label>Accent Color:</label>
        <input type="color" name="accent_color" value={profile.accent_color} onChange={handleChange} className="w-16 h-10 p-1 border rounded" />

        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {profile.photo_url && <img src={profile.photo_url} alt="Profile" className="mt-2 w-24 h-24 rounded-full object-cover" />}

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
