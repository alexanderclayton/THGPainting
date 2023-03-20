import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import { signToken } from '../utils/authMiddleware.js';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const firebaseImages = async (projectId) => {
  const imagesRef = ref(storage, `projects/${projectId}/files`);
  const { items } = await listAll(imagesRef);
  const imageUrls = await Promise.all(
    items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    })
  );
  return imageUrls;
}

const resolvers = {
    Query: {
        getClients: async () => {
            try {
                const clients = await Client.find().populate('projects');
                return clients;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getClient: async (_, { name }) => {
            console.log('getClient resolver function executing...');
            try {
                const client = await Client.findOne({ name });
                if(!client) {
                    throw new Error(`No client with name: ${name} found...`);
                }
                await client.populate('projects');
                return client;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getProjects: async () => {
            try {
                const projects = await Project.find().populate('client');
                return projects;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getProject: async (_, { id }) => {
            try {
                const project = await Project.findById(id).populate('client');
                return project;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getImages: async (_, { projectId }) => {
            const images = await firebaseImages(projectId);
            return images;
        },
    },
    Mutation: {
        addClient: async (_, { name, address, email, phoneNumber }) => {
            try {
                const client = new Client({ name, address, email, phoneNumber });
                await client.save();
                return client;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        updateClient: async (_, { id, name, address, email, phoneNumber }) => {
            try {
                const updatedClient = await Client.findByIdAndUpdate(
                    id,
                    { name, address, email, phoneNumber },
                    { new: true }
                ).populate('projects');
                return updatedClient;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        deleteClient: async (_, { id }) => {
            try {
                const deletedClient = await Client.findByIdAndDelete(id).populate(
                    'projects'
                );
                return deletedClient;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        addProject: async (_, { startDate, endDate, projectType, paid, paymentType, images }, { currentClient }) => {
            try {
              const project = new Project({ startDate, endDate, clientId: currentClient._id, projectType, paid, paymentType, images });
              await project.save();
              const client = await Client.findByIdAndUpdate(currentClient._id, { $push: { projects: project._id } });
              return project;
            } catch (err) {
              console.error(err);
              throw err;
            }
          },
                   
        updateProject: async (_, { id, startDate, endDate, clientId, projectType, paid, PaymentType }) => {
            try {
                const updatedProject = await Project.findByIdAndUpdate(
                    id,
                    { startDate, endDate, client: clientId, projectType, paid, PaymentType },
                    { new: true }
                ).populate('client');
                return updatedProject;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        deleteProject: async (_, { id }) => {
            try {
                const deletedProject = await Project.findByIdAndDelete(id).populate(
                    'client'
                );
                return deletedProject;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        addUser: async (parent, { name, email, password, avatar }) => {
            if (!avatar) {
                avatar = ''
            }
            const user = await User.create({ name, email, password, avatar });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user with this email found!");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },
        addImage: async (_, { file }) => {
            try {
              const { createReadStream, filename, mimetype } = await file;
              const stream = createReadStream();
              const storageRef = storage.ref();
              const imageReg = storageRef.child(filename);
              await imageReg.put(stream, {contentType: mimetype });
          
              const url = await imageReg.getDownloadURL();
              return url;
            } catch (err) {
              console.error(err);
              throw err;
            }
          }
          
    },
};

export default resolvers;

