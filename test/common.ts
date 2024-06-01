import { BaseEntity, RemoveOptions, SaveOptions } from 'typeorm';

export function getMockEntity<T extends BaseEntity>(props: Partial<T>): T {
  const mockEntity: BaseEntity = {
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: async function (options?: SaveOptions): Promise<T> {
      throw new Error('Function not implemented.');
    },
    remove: async function (options?: RemoveOptions): Promise<T> {
      throw new Error('Function not implemented.');
    },
    softRemove: async function (options?: SaveOptions): Promise<T> {
      throw new Error('Function not implemented.');
    },
    recover: async function (options?: SaveOptions): Promise<T> {
      throw new Error('Function not implemented.');
    },
    reload: async function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    ...props,
  };

  return mockEntity as T;
}
