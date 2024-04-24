<template>
  <v-card
    class="mt-0 audio_player"
    ref="playerContainer"
    :loading="!audioDownloaded"
    v-bind="$attrs"
  >
    <audio
      ref="audio"
      @pause="playing = false"
      @play="playing = true"
      @timeupdate="handleTimeUpdate"
      @durationchange="setDuration"
      @canplaythrough="audioDownloaded = true"
      @ended="handleAudioEnd"
      @error="$emit('error', $event)"
      type="audio/mpeg"
      :src="src"
    ></audio>

    <v-slider
      v-if="src"
      :thumb-size="12"
      min="0"
      max="1000000"
      :modelValue="parseInt((currentTime / duration) * 1000000) || 0"
      @update:modelValue="seek($event)"
    ></v-slider>

    <v-card-text class="pt-0">
      <v-row
        class="text-left"
        align="center"
        justify="center"
      >
        <v-col cols="1">
          <v-img 
            :width="70" 
            :src="albumArt" 
            aspect-ratio="1"
            cover
          >
          </v-img>
        </v-col>
        <v-col cols="4">
          <router-link
            class="d-block link"
            :to="`/userProfile/${track.userId}`"
          >
            {{ track.userNickname }}
          </router-link>

          <router-link
            class="d-block text-uppercase font-weight-bold link"
            style="letter-spacing: 0.05em"
            :to="`/trackItem/${track.id}`"
          >
            {{ track.name }}
          </router-link>
        </v-col>

        <v-col
          v-if="src"
          :cols="4"
          class="d-flex align-center justify-senter"
        >
          <v-btn
            class="mr-2"
            size="small"
            icon="mdi-skip-previous"
            :disabled="!audioDownloaded || !allowPrevious"
            @click="$emit('previous-audio')"
          >
          </v-btn>

          <v-btn
            class="mr-2"
            size="small"
            icon="mdi-rewind-5"
            :disabled="!audioDownloaded"
            @click="forwardSeconds(-5)"
          ></v-btn>

          <v-btn
            class="mr-2"
            size="small"
            :icon="playing ? 'mdi-pause' : 'mdi-play'"
            :disabled="!audioDownloaded"
            @click="playing = !playing"
          >
          </v-btn>

          <v-btn
            class="mr-2"
            size="small"
            icon="mdi-fast-forward-5"
            :disabled="!audioDownloaded" 
            @click="forwardSeconds(5)"
          ></v-btn>

          <v-btn
            size="small"
            icon="mdi-skip-next"
            :disabled="!audioDownloaded || !allowNext"
            @click="$emit('next-audio')"
          >
          </v-btn>
        </v-col>

        <v-col cols="3">
          <v-slider
            class="mt-2"
            :prepend-icon="volumeIcon"
            :model-value="muted ? 0 : volume"
            thumb-label
            :thumb-size="10"
            max="100"
            min="0"
            @update:modelValue="setVolume"
            @click:prepend="muted = !muted"
          ></v-slider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  emits: ['next-audio', 'previous-audio', 'changePlayingState'],
  props: {
    src: { type: String },
    track: { type: Object, default: null },
    allowPrevious: { type: Boolean, default: false },
    allowNext: { type: Boolean, default: false },
    albumArt: { type: String, default: null },
    autoplay: { type: Boolean, default: false },
  },
  data() {
    return {
      audioDownloaded: false,
      currentTime: 0,
      duration: 0,
      playing: false,
      volume: 40,
      seekerFocused: false,
      keydownListener: null,
      muted: false,
    };
  },
  watch: {
    playing(value) {
      if (value) {
        return this.$refs.audio.play();
      }
      this.$refs.audio.pause();
    },
    muted(value) {
      this.$refs.audio.muted = value;
    },
    audioDownloaded(value) {
      if (this.autoplay) {
        if (value) {
          this.playing = true;
        }
      }
    },
    src(value) {
      if (value) {
        this.audioDownloaded = false;
        this.playing = false;
      }
    },
    volume() {
      this.muted = false;
    },
  },
  computed: {
    volumeIcon() {
      if (this.muted) {
        return 'mdi-volume-off';
      } else if (this.volume === 0) {
        return 'mdi-volume-low';
      } else if (this.volume >= 50) {
        return 'mdi-volume-high';
      } else {
        return 'mdi-volume-medium';
      }
    },
  },
  methods: {
    setVolume(value) {
      this.volume = value;
      this.$refs.audio.volume = value / 100;
    },
    forwardSeconds(seconds) {
      let newTimestamp = this.currentTime + seconds;

      if (newTimestamp < 0) {
        newTimestamp = 0;
      } else if (newTimestamp > this.duration) {
        newTimestamp = this.duration;
      }

      this.$refs.audio.currentTime = newTimestamp;
    },
    setDuration() {
      this.duration = this.$refs.audio.duration;
    },
    handleTimeUpdate() {
      this.currentTime = this.$refs.audio?.currentTime;
    },
    handleAudioEnd() {
      if (this.allowNext) {
        this.$emit("next-audio");
      }
    },
    seek(timePercent) {
      this.$refs.audio.currentTime =
        this.$refs.audio.duration * (timePercent / 1000000.0);
    },
  },
  mounted() {
    this.$refs.audio.volume = this.volume / 100;
    this.muted = this.$refs.audio.muted;
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-input__details) {
  display: none !important;
}
.link {
  text-decoration: none;
  color: inherit;
}
.link:hover {
  text-decoration: underline;
}
</style>