import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    name: string;
    description: string;
}
export interface backendInterface {
    addSampleServices(): Promise<void>;
    getCompanyInfo(): Promise<{
        name: string;
        description: string;
        address: string;
        phone: string;
    }>;
    getService(id: bigint): Promise<Service>;
    getServices(): Promise<Array<Service>>;
    updateCompanyInfo(name: string, address: string, phone: string, description: string): Promise<void>;
}
