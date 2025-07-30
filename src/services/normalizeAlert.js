const AlertNormalized = require('../models/AlertNormalized');

function normalizeAlert({ format, fields }) {
  switch (format) {
    case 'StandardRoom':
      return new AlertNormalized({
        location: fields.room,
        subject: fields.subject,
        event: fields.event,
        room: fields.room.replace(/^Room\s+/i, '').trim(),
        format
      });

    case 'FacilityRoomBed':
      return new AlertNormalized({
        location: `${fields.room}:${fields.bed}`,
        subject: null,
        event: fields.event,
        room: fields.room,
        bed: fields.bed,
        facility: fields.facility,
        format
      });

    case 'PillowRoomBed':
      return new AlertNormalized({
        location: `${fields.room}:${fields.bed}`,
        subject: null,
        event: fields.event,
        room: fields.room,
        bed: fields.bed,
        pillow: fields.pillow,
        format
      });

    default:
      return null;
  }
}

module.exports = normalizeAlert;
