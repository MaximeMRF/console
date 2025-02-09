import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Message from './message.js'

export default class Conversation extends BaseModel {
  /**
   * Regular columns.
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Relationships.
   */
  @belongsTo(() => User, { foreignKey: 'firstUserId' })
  declare firstUser: BelongsTo<typeof User>

  @column()
  declare firstUserId: number

  @belongsTo(() => User, { foreignKey: 'secondUserId' })
  declare secondUser: BelongsTo<typeof User>

  @column()
  declare secondUserId: number

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  /**
   * Timestamps.
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
