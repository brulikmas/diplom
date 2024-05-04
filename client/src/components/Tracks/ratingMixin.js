import { createRating, deleteRating } from '../../http/ratingApi';

export default {
  computed: {
    isUserMarkRating() {
      return !!this.track.usersRating.find(v => v.userId === this.user.id);
    }
  },
  methods: {
    async addOrRemoveRating() {
      try {
        if (this.isUserMarkRating) {
          await deleteRating(this.track.id);
          this.track.usersRating = this.track.usersRating.filter(v => v.userId !== this.user.id);
        } else {
          const newRating = await createRating(this.track.id)
          this.track.usersRating.push(newRating);
        }
      } catch (e) {
        alert(e);
      }
    }
  },
}