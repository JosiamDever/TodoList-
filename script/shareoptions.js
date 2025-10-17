const shareData = {
  title: 'My Achievement!',
  text: 'I just completed all my tasks!',
  url: window.location.href  // or any custom link you want to share
};

export async function shareAchievement() {
  if (navigator.share) {
    
    try {
      
      await navigator.share(shareData);//remaining code pauses until this method set all 
      
      console.log('Shared successfully!');
      
    } catch (err) {
      
      console.error('Sharing failed:', err);
      
    }
    
  } else {
    
    alert('Sharing not supported on this device');
    
  }
}
