import mongoose from "mongoose";
import { config } from "../config/config.js";

class Database {
    private static instance: Database;

    
    private eventsRegistered = false;

    private constructor() {
        this.registerEvents();
    }

    
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }


    public async connect(): Promise<void> {
        const state = mongoose.connection.readyState;

        switch (state) {
            case 1:
                console.log("MongoDB is already connected.");
                return;

            case 2:
                console.log("MongoDB connection is already in progress.");
                return;

            case 3:
                console.log("MongoDB is disconnecting. Please wait.");
                return;
        }

        try {
            await mongoose.connect(config.mongodb_uri, {
                
                maxPoolSize: 20,
                minPoolSize: 5,

                
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,

                
                heartbeatFrequencyMS: 10000,

                
                bufferCommands: false,
            });

            console.log("MongoDB connection established.");
        } catch (error) {
            console.error("Failed to connect to MongoDB.");
            throw error;
        }
    }

    
    public async disconnect(): Promise<void> {
        if (mongoose.connection.readyState === 0) {
            console.log("MongoDB is already disconnected.");
            return;
        }

        await mongoose.connection.close();

        console.log("MongoDB connection closed.");
    }

    
    private registerEvents(): void {
        if (this.eventsRegistered) return;

        this.eventsRegistered = true;

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected");
        });

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB Error:", error);
        });

        mongoose.connection.on("close", () => {
            console.log("MongoDB connection closed");
        });
    }

    
    public get isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }

    
    public get readyState(): number {
        return mongoose.connection.readyState;
    }

    
    public get connection() {
        return mongoose.connection;
    }
}

export const database = Database.getInstance();


export const startDbServer=async()=>{

    try {
        await database.connect()
    } catch (error) {
        console.error("ERROR WHILE CONNECTING TO DB",error)
        process.exit(1)        
    }

}