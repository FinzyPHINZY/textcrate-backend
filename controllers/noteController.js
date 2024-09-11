const Note = require('../models/Note')
const logger = require('../utils/logger')

module.exports = {
  fetchAllNotes: async (req, res) => {
    try {
      const notes = await Note.find({})
      logger.info('Fetched all notes successfully')

      res.json(notes)
    } catch (error) {
      logger.error(error)
      res
        .status(500)
        .json({
          success: 'False',
          message: 'Failed to fetch notes',
          error: error.message,
        })
    }
  },
}
