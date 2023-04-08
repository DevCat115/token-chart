export function tokenAge(tokenTimestamp: number | undefined): string {
  if (tokenTimestamp) {
    const tokenDate = new Date(tokenTimestamp * 1000);
    const now = new Date();

    // Get the total difference in seconds
    const diffSeconds = Math.floor((now.getTime() - tokenDate.getTime()) / 1000);

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds`;
    }

    // Get the total difference in minutes
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes`;
    }

    // Get the total difference in hours
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours} hours`;
    }

    // Get the total difference in days
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 30) {
      return `${diffDays} days`;
    }

    // Approximate the months by using 30 days as a rough estimate
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths < 12) {
      return `${diffMonths} months`;
    }

    // Calculate the years
    const diffYears = Math.floor(diffMonths / 12);

    return `${diffYears} years`;
  } else {
    return '-';
  }
}
