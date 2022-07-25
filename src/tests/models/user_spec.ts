import { User, UsersModel } from '../../models/user';

const usersModel = new UsersModel();
const testUser: User = {
    firstName: 'Alaa',
    lastName: 'Alaraby',
    password: '2022#alaa'
};
let expectedUser: User;

describe("Testing user model", () => {
    it('should have an index method', () => {
        expect(usersModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(usersModel.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(usersModel.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(usersModel.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(usersModel.delete).toBeDefined();
    });


    it('should CREATE a user using create method', async () => {
        const result = await usersModel.create(testUser);
        expect({ firstName: result.firstName, lastName: result.lastName, password: result.password }).toEqual({
            firstName: testUser.firstName, lastName: testUser.lastName, password: testUser.password
        });
    });

    it('should INDEX all users using index method', async () => {
        const usersList = await usersModel.index();
        expect(usersList[0].firstName).toMatch(testUser.firstName);
        expect(usersList[0].lastName).toMatch(testUser.lastName);
        expect(usersList[0].password).toMatch(testUser.password);
    });

    it('should SHOW user based on id using index method', async () => {
        const user = await usersModel.show(expectedUser.user_id as number);
        expect(user).toEqual(expectedUser);
    });

    it('should UPDATE user using update method', async () => {
    
        const user = await usersModel.update(expectedUser.user_id as number, expectedUser.password);
        expect({ user_id: user.user_id, password: user.password }).toEqual({
            user_id: expectedUser.user_id, password: expectedUser.password
        });
    });

    it('should DELETE user using delete method', async () => {
        const deletedUser = await usersModel.delete(expectedUser.user_id as number);
        expect(deletedUser.user_id).toEqual(expectedUser.user_id);
    });

});