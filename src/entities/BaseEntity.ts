// src/entities/BaseEntity.ts
export abstract class BaseEntity {
  abstract tableName: string;

  // Базовые методы CRUD
  abstract list(orderBy?: string): Promise<any[]>;
  abstract getById(id: string): Promise<any>;
  abstract create(data: any): Promise<any>;
  abstract update(id: string, data: any): Promise<any>;
  abstract delete(id: string): Promise<any>;

  protected async query(sql: string, params?: any[]): Promise<any> {
    // Здесь будет реализация запросов к Supabase
    // Это абстрактный метод, реализация зависит от вашего клиента Supabase
    throw new Error("Method not implemented");
  }
}