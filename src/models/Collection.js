'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      const record = await this.model.create(json);
      return record;
    } catch (error) {
      console.error(`Error Creating ${this.model.name} Data Model`);
      return error;
    }
  }

  async read(id = null) {
    try {
      if (!id) {
        //! GET ALL RECORDS
        const records = await this.model.findAll();
        return records;
      } else {
        //! GET BT PK ID
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      }
    } catch (error) {
      console.error(`Error Creating ${this.model.name} Data Model`);
      return error;
    }
  }

  async update(id, json) {
    try {
      if (!id) throw new Error(`No Record ID for ${this.model.name}`);
      const record = await this.model.findOne({ where: { id } });
      let updatedrecord = await record.update(json);
      return updatedrecord;
    } catch (error) {
      console.error(`Error Updating ${this.model.name} Data Model`);
      return error;
    }
  }
  async delete(id) {
    try {
      if (!id) throw new Error(`No Record ID for ${this.model.name}`);
      let deletedRecord = await this.model.destroy({ where: { id } });
      return deletedRecord;
    } catch (error) {
      console.error(`Error Deleting ${this.model.name} Data Model`);
      return error;
    }
  }
}

module.exports = Collection;
