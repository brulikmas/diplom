export default {
  mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.tracks.length < this.totalItems) {
        const params = this.filter || [];
        this.loadMoreTracks(params);
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
}