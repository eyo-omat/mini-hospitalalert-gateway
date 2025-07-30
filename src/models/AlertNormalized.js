// src/models/AlertNormalized.js

class AlertNormalized {
  constructor({
    location = null,
    subject = null,
    event = null,
    room = null,
    bed = null,
    facility = null,
    pillow = null,
    format = null
  } = {}) {
    this.location = location;
    this.subject = subject;
    this.event = event;
    this.room = room;
    this.bed = bed;
    this.facility = facility;
    this.pillow = pillow;
    this.format = format;
  }

  // Optional helper methods
  toLogString() {
    return `[${this.format}] ${this.location} - ${this.subject || 'N/A'} - ${this.event}`;
  }

  toPayload() {
    return {
      location: this.location,
      subject: this.subject,
      event: this.event
    };
  }

  isCritical() {
    return /critical|code blue/i.test(this.event);
  }
}

module.exports = AlertNormalized;
