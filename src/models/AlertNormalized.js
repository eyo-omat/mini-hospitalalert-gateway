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
    this.type = this.detectType();
  }

  detectType() {
    if (this.subject) {
      if (/^(Dr\.|Monitor|Nurse|Security|Device)/i.test(this.subject)) return 'device';
      return 'patient';
    }
    return 'system';
  }

  toLogString() {
    return `[${this.format}] ${this.location} - ${this.subject || 'N/A'} - ${this.event}`;
  }

  toPayload() {
    return {
      location: this.location,
      subject: this.subject,
      event: this.event,
      type: this.type
    };
  }

  isCritical() {
    return /critical|code blue/i.test(this.event);
  }
}

module.exports = AlertNormalized;
