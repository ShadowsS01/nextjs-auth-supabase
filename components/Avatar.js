/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants';
import { FaRegUserCircle } from 'react-icons/fa';

export default function Avatar({ url, avatarAlt, size, radius }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from(DEFAULT_AVATARS_BUCKET).download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
    }
  }

  return avatarUrl ? (
    <img src={avatarUrl} alt={`Avatar-${avatarAlt}`} className="object-cover" style={{ height: size, width: size, borderRadius: radius }} />
  ) : (
    <FaRegUserCircle className='rounded-md' style={{ height: size, width: size, borderRadius: radius }} />
  );
}