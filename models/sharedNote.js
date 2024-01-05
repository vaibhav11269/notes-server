module.exports = function (sequelize, DataTypes) {
    const sharedNote = sequelize.define("sharedNote", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        shared_by: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        shared_to: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        note_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });

    return sharedNote;
}