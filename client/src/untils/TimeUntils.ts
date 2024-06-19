
export const calculateTimeAgo = (createdAt: Date) => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - createdAt.getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} `;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} `;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} `;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
  };
  