import React from 'react'

const imgExt = /\.(jpg|jpeg|png|gif|bmp|svg|tiff|webp)$/i;
const videoExt = /\.(mp4|webm|ogg|avi|mov|flv)$/i;
const style = { maxWidth: '60%', height: 'auto', margin: '20px auto', display: 'block' };
const type = (mediaUrl) => `video/${mediaUrl.split('.').pop().toLowerCase()}`;

export const formatDate = (dateString) => {
   const date = new Date(dateString);

   return date.toLocaleDateString(navigator.language || 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });
};

export const renderMedia = (mediaUrl) => {
   if (!mediaUrl) return null;

   if (imgExt.test(mediaUrl)) {
      return <img src={mediaUrl} alt="Post media" style={style} />;
   }

   if (videoExt.test(mediaUrl)) {      

      return (
         <video controls style={style}>
            <source src={mediaUrl} type={type(mediaUrl)} />
            Браузер не поддерживает видео.
         </video>
      );
   }

   return null;
};

export const formatContent = (content) => {
   if (!content) return content;

   return content.split('\n').map((line, i) => {
      const mediaUrl = line.trim();

      if (imgExt.test(mediaUrl)) {
         return (
            <React.Fragment key={i}>
               <img src={mediaUrl} alt="Post media" style={style} />
               <br />
            </React.Fragment>
         );
      }

      if (videoExt.test(mediaUrl)) {
         
         return (
            <React.Fragment key={i}>
               <video controls style={style}>
                  <source src={mediaUrl} type={type(mediaUrl)} />
                  Браузер не поддерживает видео.
               </video>
               <br />
            </React.Fragment>
         );
      }

      return (
         <React.Fragment key={i}>
            {line}
            <br />
         </React.Fragment>
      );
   });
};
