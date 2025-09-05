export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      account_number_sequences: {
        Row: {
          current_seq: number
          type: string
        }
        Insert: {
          current_seq?: number
          type: string
        }
        Update: {
          current_seq?: number
          type?: string
        }
        Relationships: []
      }
      agent_client_types: {
        Row: {
          agent_id: number
          client_type: Database["public"]["Enums"]["client_type_enum"]
        }
        Insert: {
          agent_id: number
          client_type: Database["public"]["Enums"]["client_type_enum"]
        }
        Update: {
          agent_id?: number
          client_type?: Database["public"]["Enums"]["client_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "agent_client_types_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_groups: {
        Row: {
          created_at: string | null
          id: number
          short_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          short_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          short_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      agent_to_agent_groups: {
        Row: {
          agent_group_id: number
          agent_id: number
        }
        Insert: {
          agent_group_id: number
          agent_id: number
        }
        Update: {
          agent_group_id?: number
          agent_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "agent_to_agent_groups_agent_group_id_fkey"
            columns: ["agent_group_id"]
            isOneToOne: false
            referencedRelation: "agent_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_to_agent_groups_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_users: {
        Row: {
          agent_id: number | null
          created_at: string | null
          id: number
          role: string
          user_id: string | null
        }
        Insert: {
          agent_id?: number | null
          created_at?: string | null
          id?: number
          role: string
          user_id?: string | null
        }
        Update: {
          agent_id?: number | null
          created_at?: string | null
          id?: number
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_users_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          account_number: string
          additional_name: string | null
          branch_code: string
          created_at: string | null
          hierarchy_type: Database["public"]["Enums"]["hierarchy_type_enum"]
          id: number
          name: string
          sales_area_code: string
          short_name: string | null
          status: Database["public"]["Enums"]["agent_status_enum"]
          stockholder: boolean
          type: Database["public"]["Enums"]["participant_type_enum"]
          updated_at: string | null
        }
        Insert: {
          account_number: string
          additional_name?: string | null
          branch_code: string
          created_at?: string | null
          hierarchy_type?: Database["public"]["Enums"]["hierarchy_type_enum"]
          id?: number
          name: string
          sales_area_code: string
          short_name?: string | null
          status?: Database["public"]["Enums"]["agent_status_enum"]
          stockholder?: boolean
          type: Database["public"]["Enums"]["participant_type_enum"]
          updated_at?: string | null
        }
        Update: {
          account_number?: string
          additional_name?: string | null
          branch_code?: string
          created_at?: string | null
          hierarchy_type?: Database["public"]["Enums"]["hierarchy_type_enum"]
          id?: number
          name?: string
          sales_area_code?: string
          short_name?: string | null
          status?: Database["public"]["Enums"]["agent_status_enum"]
          stockholder?: boolean
          type?: Database["public"]["Enums"]["participant_type_enum"]
          updated_at?: string | null
        }
        Relationships: []
      }
      airline_product_type_attributes: {
        Row: {
          attribute_id: number
          product_type_id: number
        }
        Insert: {
          attribute_id: number
          product_type_id: number
        }
        Update: {
          attribute_id?: number
          product_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "airline_product_type_attributes_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "special_handling_attributes"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_product_types: {
        Row: {
          airline_id: number
          cargo_type_code: string
          code: string
          created_at: string | null
          description: string | null
          id: number
          is_dangerous_goods: boolean | null
          is_special_cargo: boolean | null
          name: string
          product_attributes: Json | null
          requires_ramp_attention: boolean | null
          updated_at: string | null
        }
        Insert: {
          airline_id: number
          cargo_type_code: string
          code: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_dangerous_goods?: boolean | null
          is_special_cargo?: boolean | null
          name: string
          product_attributes?: Json | null
          requires_ramp_attention?: boolean | null
          updated_at?: string | null
        }
        Update: {
          airline_id?: number
          cargo_type_code?: string
          code?: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_dangerous_goods?: boolean | null
          is_special_cargo?: boolean | null
          name?: string
          product_attributes?: Json | null
          requires_ramp_attention?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_product_types_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_product_types_cargo_type_code_fkey"
            columns: ["cargo_type_code"]
            isOneToOne: false
            referencedRelation: "cargo_types"
            referencedColumns: ["type_code"]
          },
          {
            foreignKeyName: "airline_product_types_cargo_type_code_fkey"
            columns: ["cargo_type_code"]
            isOneToOne: false
            referencedRelation: "wv_airline_cargo_coefficients_view"
            referencedColumns: ["cargo_type_code"]
          },
          {
            foreignKeyName: "fk_cargo_type"
            columns: ["cargo_type_code"]
            isOneToOne: false
            referencedRelation: "cargo_types"
            referencedColumns: ["type_code"]
          },
          {
            foreignKeyName: "fk_cargo_type"
            columns: ["cargo_type_code"]
            isOneToOne: false
            referencedRelation: "wv_airline_cargo_coefficients_view"
            referencedColumns: ["cargo_type_code"]
          },
        ]
      }
      airline_tariffs: {
        Row: {
          airline_id: number
          currency: string | null
          destination: string
          id: number
          includes_vat: boolean | null
          min_rate: number
          origin: string
          product_code: string
          tariff_type: Database["public"]["Enums"]["tariff_type_enum"]
          valid_from: string
          valid_to: string
          weight_rates: Json | null
        }
        Insert: {
          airline_id: number
          currency?: string | null
          destination: string
          id?: number
          includes_vat?: boolean | null
          min_rate: number
          origin: string
          product_code: string
          tariff_type: Database["public"]["Enums"]["tariff_type_enum"]
          valid_from: string
          valid_to: string
          weight_rates?: Json | null
        }
        Update: {
          airline_id?: number
          currency?: string | null
          destination?: string
          id?: number
          includes_vat?: boolean | null
          min_rate?: number
          origin?: string
          product_code?: string
          tariff_type?: Database["public"]["Enums"]["tariff_type_enum"]
          valid_from?: string
          valid_to?: string
          weight_rates?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      airline_volumetric_coefficients: {
        Row: {
          airline_id: number
          approved_by: string | null
          cargo_type_id: number
          coefficient: number
          created_at: string
          id: number
          min_chargeable_weight: number | null
          notes: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          airline_id: number
          approved_by?: string | null
          cargo_type_id?: number
          coefficient?: number
          created_at?: string
          id?: number
          min_chargeable_weight?: number | null
          notes?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Update: {
          airline_id?: number
          approved_by?: string | null
          cargo_type_id?: number
          coefficient?: number
          created_at?: string
          id?: number
          min_chargeable_weight?: number | null
          notes?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_volumetric_coefficients_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_volumetric_coefficients_cargo_type_id_fkey"
            columns: ["cargo_type_id"]
            isOneToOne: false
            referencedRelation: "cargo_types"
            referencedColumns: ["id"]
          },
        ]
      }
      airlines: {
        Row: {
          account_number: string | null
          created_at: string | null
          iata_code: string
          icao_code: string
          id: number
          is_active: boolean | null
          name: string
          prefix: string | null
          updated_at: string | null
        }
        Insert: {
          account_number?: string | null
          created_at?: string | null
          iata_code: string
          icao_code: string
          id?: number
          is_active?: boolean | null
          name: string
          prefix?: string | null
          updated_at?: string | null
        }
        Update: {
          account_number?: string | null
          created_at?: string | null
          iata_code?: string
          icao_code?: string
          id?: number
          is_active?: boolean | null
          name?: string
          prefix?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      awb_assignment_queue: {
        Row: {
          agent_id: number
          booking_id: number
          created_at: string | null
          processed: boolean | null
          queue_id: number
        }
        Insert: {
          agent_id: number
          booking_id: number
          created_at?: string | null
          processed?: boolean | null
          queue_id?: number
        }
        Update: {
          agent_id?: number
          booking_id?: number
          created_at?: string | null
          processed?: boolean | null
          queue_id?: number
        }
        Relationships: []
      }
      awb_events: {
        Row: {
          actor_user_id: string | null
          agent_id: number | null
          awb_id: number | null
          created_at: string | null
          event_type: string
          id: number
          notes: string | null
          related_booking_id: number | null
        }
        Insert: {
          actor_user_id?: string | null
          agent_id?: number | null
          awb_id?: number | null
          created_at?: string | null
          event_type: string
          id?: number
          notes?: string | null
          related_booking_id?: number | null
        }
        Update: {
          actor_user_id?: string | null
          agent_id?: number | null
          awb_id?: number | null
          created_at?: string | null
          event_type?: string
          id?: number
          notes?: string | null
          related_booking_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awb_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awb_events_awb_id_fkey"
            columns: ["awb_id"]
            isOneToOne: false
            referencedRelation: "awbs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awb_events_awb_id_fkey"
            columns: ["awb_id"]
            isOneToOne: false
            referencedRelation: "wv_available_awbs"
            referencedColumns: ["id"]
          },
        ]
      }
      awb_iata_message_history: {
        Row: {
          changed_by: string | null
          changed_fields: Json | null
          created_at: string
          id: number
          message_text: string
          original_message_id: number
          version_number: number
        }
        Insert: {
          changed_by?: string | null
          changed_fields?: Json | null
          created_at?: string
          id?: number
          message_text: string
          original_message_id: number
          version_number: number
        }
        Update: {
          changed_by?: string | null
          changed_fields?: Json | null
          created_at?: string
          id?: number
          message_text?: string
          original_message_id?: number
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "awb_iata_message_history_original_message_id_fkey"
            columns: ["original_message_id"]
            isOneToOne: false
            referencedRelation: "awb_iata_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      awb_iata_messages: {
        Row: {
          awb_issued_record_id: number
          created_at: string
          error_details: string | null
          id: number
          message_number: string
          message_text: string
          message_type: string
          message_version: number
          status: string
          updated_at: string
        }
        Insert: {
          awb_issued_record_id: number
          created_at?: string
          error_details?: string | null
          id?: number
          message_number: string
          message_text: string
          message_type: string
          message_version?: number
          status?: string
          updated_at?: string
        }
        Update: {
          awb_issued_record_id?: number
          created_at?: string
          error_details?: string | null
          id?: number
          message_number?: string
          message_text?: string
          message_type?: string
          message_version?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "awb_iata_messages_awb_issued_record_id_fkey"
            columns: ["awb_issued_record_id"]
            isOneToOne: false
            referencedRelation: "awb_issued_records"
            referencedColumns: ["id"]
          },
        ]
      }
      awb_issued_records: {
        Row: {
          awb_data: Json
          awb_number: string | null
          booking_id: number
          id: number
          issued_at: string
          update_at: string | null
          updated_at: string
        }
        Insert: {
          awb_data: Json
          awb_number?: string | null
          booking_id: number
          id?: number
          issued_at?: string
          update_at?: string | null
          updated_at?: string
        }
        Update: {
          awb_data?: Json
          awb_number?: string | null
          booking_id?: number
          id?: number
          issued_at?: string
          update_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "awb_issued_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awb_issued_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awb_issued_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awb_issued_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awb_issued_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      awb_ref: {
        Row: {
          booking_id: number
          created_at: string
          error_message: string | null
          id: number
          is_auto_generated: boolean
          last_processed_at: string | null
          prefix: string | null
          processing_attempts: number
          processing_stage: string
          reference_type: string
          serial: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          booking_id: number
          created_at?: string
          error_message?: string | null
          id?: number
          is_auto_generated?: boolean
          last_processed_at?: string | null
          prefix?: string | null
          processing_attempts?: number
          processing_stage?: string
          reference_type?: string
          serial?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          booking_id?: number
          created_at?: string
          error_message?: string | null
          id?: number
          is_auto_generated?: boolean
          last_processed_at?: string | null
          prefix?: string | null
          processing_attempts?: number
          processing_stage?: string
          reference_type?: string
          serial?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awb_ref_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awb_ref_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awb_ref_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awb_ref_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awb_ref_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      awb_stocks: {
        Row: {
          agent_id: number | null
          assigned_at: string | null
          assigned_by: string | null
          awb_prefix: string
          id: number
          notes: string | null
          range_end: string
          range_start: string
          stock_source: string
        }
        Insert: {
          agent_id?: number | null
          assigned_at?: string | null
          assigned_by?: string | null
          awb_prefix: string
          id?: number
          notes?: string | null
          range_end: string
          range_start: string
          stock_source: string
        }
        Update: {
          agent_id?: number | null
          assigned_at?: string | null
          assigned_by?: string | null
          awb_prefix?: string
          id?: number
          notes?: string | null
          range_end?: string
          range_start?: string
          stock_source?: string
        }
        Relationships: [
          {
            foreignKeyName: "awb_stocks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      awbs: {
        Row: {
          awb_number: string
          awb_stock_id: number | null
          booking_id: number | null
          created_at: string | null
          id: number
          issued: boolean | null
          issued_at: string | null
          owner_agent_id: number | null
          status: string
          stock_source: string
          updated_at: string | null
          used_for_booking_id: number | null
        }
        Insert: {
          awb_number: string
          awb_stock_id?: number | null
          booking_id?: number | null
          created_at?: string | null
          id?: number
          issued?: boolean | null
          issued_at?: string | null
          owner_agent_id?: number | null
          status?: string
          stock_source: string
          updated_at?: string | null
          used_for_booking_id?: number | null
        }
        Update: {
          awb_number?: string
          awb_stock_id?: number | null
          booking_id?: number | null
          created_at?: string | null
          id?: number
          issued?: boolean | null
          issued_at?: string | null
          owner_agent_id?: number | null
          status?: string
          stock_source?: string
          updated_at?: string | null
          used_for_booking_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "awb_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awb_stock_summary"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awbs_by_stock"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "awbs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awbs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awbs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awbs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "awbs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "awbs_owner_agent_id_fkey"
            columns: ["owner_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      booking: {
        Row: {
          agent: number | null
          airwaybillsIssuedOn: string | null
          awb_ref: string | null
          bookingReferenceType: Database["public"]["Enums"]["booking_reference_type"]
          bookingStatus: Database["public"]["Enums"]["booking_status"]
          bookingType: string | null
          break_down: boolean | null
          businessId: number
          cargo_measurements_id: number | null
          carrier: number | null
          charge_code: Database["public"]["Enums"]["charge_code_enum"] | null
          commodity: string | null
          consignee: number | null
          consolidation: boolean
          created_by: string | null
          createdAt: string
          currency: string | null
          data_capture:
            | Database["public"]["Enums"]["data_capture_status"]
            | null
          declared_value_carriage: number | null
          declared_value_customs: number | null
          delivery_call: boolean | null
          delivery_remarks: string | null
          destination: string | null
          eawbDataId: number | null
          eawbDocumentType:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          isEAWB: boolean
          must_fly: boolean | null
          nature_of_goods: string | null
          origin: string | null
          over_size: boolean | null
          owner_id: string | null
          package: number | null
          payment_method: string | null
          reference: string
          remarks: string | null
          route: number | null
          service_level: string | null
          shipmentMeasurements: number | null
          shipper: number | null
          shipperLoadedContainer: boolean | null
          specialHandling: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          agent?: number | null
          airwaybillsIssuedOn?: string | null
          awb_ref?: string | null
          bookingReferenceType?: Database["public"]["Enums"]["booking_reference_type"]
          bookingStatus: Database["public"]["Enums"]["booking_status"]
          bookingType?: string | null
          break_down?: boolean | null
          businessId?: number
          cargo_measurements_id?: number | null
          carrier?: number | null
          charge_code?: Database["public"]["Enums"]["charge_code_enum"] | null
          commodity?: string | null
          consignee?: number | null
          consolidation: boolean
          created_by?: string | null
          createdAt?: string
          currency?: string | null
          data_capture?:
            | Database["public"]["Enums"]["data_capture_status"]
            | null
          declared_value_carriage?: number | null
          declared_value_customs?: number | null
          delivery_call?: boolean | null
          delivery_remarks?: string | null
          destination?: string | null
          eawbDataId?: number | null
          eawbDocumentType?:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          isEAWB?: boolean
          must_fly?: boolean | null
          nature_of_goods?: string | null
          origin?: string | null
          over_size?: boolean | null
          owner_id?: string | null
          package?: number | null
          payment_method?: string | null
          reference?: string
          remarks?: string | null
          route?: number | null
          service_level?: string | null
          shipmentMeasurements?: number | null
          shipper?: number | null
          shipperLoadedContainer?: boolean | null
          specialHandling?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          agent?: number | null
          airwaybillsIssuedOn?: string | null
          awb_ref?: string | null
          bookingReferenceType?: Database["public"]["Enums"]["booking_reference_type"]
          bookingStatus?: Database["public"]["Enums"]["booking_status"]
          bookingType?: string | null
          break_down?: boolean | null
          businessId?: number
          cargo_measurements_id?: number | null
          carrier?: number | null
          charge_code?: Database["public"]["Enums"]["charge_code_enum"] | null
          commodity?: string | null
          consignee?: number | null
          consolidation?: boolean
          created_by?: string | null
          createdAt?: string
          currency?: string | null
          data_capture?:
            | Database["public"]["Enums"]["data_capture_status"]
            | null
          declared_value_carriage?: number | null
          declared_value_customs?: number | null
          delivery_call?: boolean | null
          delivery_remarks?: string | null
          destination?: string | null
          eawbDataId?: number | null
          eawbDocumentType?:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          isEAWB?: boolean
          must_fly?: boolean | null
          nature_of_goods?: string | null
          origin?: string | null
          over_size?: boolean | null
          owner_id?: string | null
          package?: number | null
          payment_method?: string | null
          reference?: string
          remarks?: string | null
          route?: number | null
          service_level?: string | null
          shipmentMeasurements?: number | null
          shipper?: number | null
          shipperLoadedContainer?: boolean | null
          specialHandling?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_agent_fkey"
            columns: ["agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_bookingType_fkey"
            columns: ["bookingType"]
            isOneToOne: false
            referencedRelation: "booking_types"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "booking_carrier_fkey"
            columns: ["carrier"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_consignee_fkey"
            columns: ["consignee"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_eawb_data_fkey"
            columns: ["eawbDataId"]
            isOneToOne: false
            referencedRelation: "booking_eawb_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_shipper_fkey"
            columns: ["shipper"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_base_product: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          label: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          label: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          label?: string
        }
        Relationships: []
      }
      booking_customs_security: {
        Row: {
          booking_id: number
          control_information_code: string | null
          country_code: string | null
          created_at: string
          customs_destination_code: string | null
          customs_origin_code: string | null
          id: number
          information_identifier: string | null
          insurance_currency: string | null
          insurance_value: number | null
          is_customs_information: boolean
          supplementary_control_information: string | null
          updated_at: string
        }
        Insert: {
          booking_id: number
          control_information_code?: string | null
          country_code?: string | null
          created_at?: string
          customs_destination_code?: string | null
          customs_origin_code?: string | null
          id?: number
          information_identifier?: string | null
          insurance_currency?: string | null
          insurance_value?: number | null
          is_customs_information?: boolean
          supplementary_control_information?: string | null
          updated_at?: string
        }
        Update: {
          booking_id?: number
          control_information_code?: string | null
          country_code?: string | null
          created_at?: string
          customs_destination_code?: string | null
          customs_origin_code?: string | null
          id?: number
          information_identifier?: string | null
          insurance_currency?: string | null
          insurance_value?: number | null
          is_customs_information?: boolean
          supplementary_control_information?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_customs_security_booking_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_customs_security_booking_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_customs_security_booking_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_customs_security_booking_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_customs_security_booking_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_customs_security_insurance_currency_fkey"
            columns: ["insurance_currency"]
            isOneToOne: false
            referencedRelation: "currency"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_density_indicators: {
        Row: {
          code: string
          created_at: string | null
          description: string
          updated_at: string | null
          weight_volume_ratio: number
        }
        Insert: {
          code: string
          created_at?: string | null
          description: string
          updated_at?: string | null
          weight_volume_ratio: number
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string
          updated_at?: string | null
          weight_volume_ratio?: number
        }
        Relationships: []
      }
      booking_eawb_data: {
        Row: {
          awbNumber: string | null
          bookingId: number
          confirmedAt: string | null
          dataSentAt: string | null
          ediMessageId: number | null
          fmaReceivedAt: string | null
          fohReceivedAt: string | null
          fwbSentAt: string | null
          hasDocuments: boolean
          id: number
          isConsolidation: boolean
          isSecuredCargo: boolean
          lastError: string | null
          rcsReceivedAt: string | null
          reference: string | null
          securityDeclaration: string | null
          securityStatus:
            | Database["public"]["Enums"]["booking_eawb_security_status"]
            | null
          specialHandlingCode:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          status: Database["public"]["Enums"]["eawb_status_type"]
          updatedAt: string | null
        }
        Insert: {
          awbNumber?: string | null
          bookingId: number
          confirmedAt?: string | null
          dataSentAt?: string | null
          ediMessageId?: number | null
          fmaReceivedAt?: string | null
          fohReceivedAt?: string | null
          fwbSentAt?: string | null
          hasDocuments?: boolean
          id?: number
          isConsolidation?: boolean
          isSecuredCargo?: boolean
          lastError?: string | null
          rcsReceivedAt?: string | null
          reference?: string | null
          securityDeclaration?: string | null
          securityStatus?:
            | Database["public"]["Enums"]["booking_eawb_security_status"]
            | null
          specialHandlingCode?:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          status?: Database["public"]["Enums"]["eawb_status_type"]
          updatedAt?: string | null
        }
        Update: {
          awbNumber?: string | null
          bookingId?: number
          confirmedAt?: string | null
          dataSentAt?: string | null
          ediMessageId?: number | null
          fmaReceivedAt?: string | null
          fohReceivedAt?: string | null
          fwbSentAt?: string | null
          hasDocuments?: boolean
          id?: number
          isConsolidation?: boolean
          isSecuredCargo?: boolean
          lastError?: string | null
          rcsReceivedAt?: string | null
          reference?: string | null
          securityDeclaration?: string | null
          securityStatus?:
            | Database["public"]["Enums"]["booking_eawb_security_status"]
            | null
          specialHandlingCode?:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          status?: Database["public"]["Enums"]["eawb_status_type"]
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_eawb_data_awbnumber_fkey"
            columns: ["awbNumber"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["awb_ref"]
          },
          {
            foreignKeyName: "booking_eawb_data_awbnumber_fkey"
            columns: ["awbNumber"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["awb_ref"]
          },
          {
            foreignKeyName: "booking_eawb_data_awbnumber_fkey"
            columns: ["awbNumber"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["awb_ref"]
          },
          {
            foreignKeyName: "booking_eawb_data_awbnumber_fkey"
            columns: ["awbNumber"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["awb_ref"]
          },
          {
            foreignKeyName: "booking_eawb_data_awbnumber_fkey"
            columns: ["awbNumber"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["awb_ref"]
          },
          {
            foreignKeyName: "eawb_data_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "eawb_data_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_data_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_data_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "eawb_data_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_data_edimessageid_fkey"
            columns: ["ediMessageId"]
            isOneToOne: false
            referencedRelation: "booking_edi_messages"
            referencedColumns: ["messageId"]
          },
          {
            foreignKeyName: "eawb_data_ediMessageId_fkey"
            columns: ["ediMessageId"]
            isOneToOne: false
            referencedRelation: "booking_edi_messages"
            referencedColumns: ["messageId"]
          },
        ]
      }
      booking_eawb_events: {
        Row: {
          bookingId: number
          details: Json | null
          eventTime: string
          eventType: Database["public"]["Enums"]["booking_eawb_event_type"]
          id: number
          messageId: number | null
          userId: string | null
        }
        Insert: {
          bookingId: number
          details?: Json | null
          eventTime?: string
          eventType: Database["public"]["Enums"]["booking_eawb_event_type"]
          id?: number
          messageId?: number | null
          userId?: string | null
        }
        Update: {
          bookingId?: number
          details?: Json | null
          eventTime?: string
          eventType?: Database["public"]["Enums"]["booking_eawb_event_type"]
          id?: number
          messageId?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eawb_events_bookingid_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "eawb_events_bookingid_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_events_bookingid_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_events_bookingid_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "eawb_events_bookingid_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "eawb_events_messageid_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "booking_edi_messages"
            referencedColumns: ["messageId"]
          },
        ]
      }
      booking_edi_messages: {
        Row: {
          bookingId: number
          errorDetails: string | null
          messageContent: Json
          messageId: number
          messageType: string
          processedAt: string | null
          receivedAt: string | null
          sentAt: string
          status: string
        }
        Insert: {
          bookingId: number
          errorDetails?: string | null
          messageContent: Json
          messageId?: number
          messageType: string
          processedAt?: string | null
          receivedAt?: string | null
          sentAt?: string
          status: string
        }
        Update: {
          bookingId?: number
          errorDetails?: string | null
          messageContent?: Json
          messageId?: number
          messageType?: string
          processedAt?: string | null
          receivedAt?: string | null
          sentAt?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_edi_messages_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_edi_messages_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_edi_messages_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_edi_messages_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_edi_messages_bookingId_fkey"
            columns: ["bookingId"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      booking_segment: {
        Row: {
          active_allotment_business_id: string | null
          allocation_code: string | null
          arrival_offset_days: number | null
          booking_closed_on: string | null
          booking_id: number | null
          carrier_code: string | null
          created_at: string
          departure_offset_days: number | null
          id: number
          offload_location_code: string
          onload_location_code: string
          pieces: number | null
          sequence: number
          status: string | null
          transport_details: Json | null
          transport_means_id: number | null
          transport_type: Database["public"]["Enums"]["transport_type_enum"]
          updated_at: string
          vehicle_number: string | null
        }
        Insert: {
          active_allotment_business_id?: string | null
          allocation_code?: string | null
          arrival_offset_days?: number | null
          booking_closed_on?: string | null
          booking_id?: number | null
          carrier_code?: string | null
          created_at?: string
          departure_offset_days?: number | null
          id?: number
          offload_location_code: string
          onload_location_code: string
          pieces?: number | null
          sequence?: number
          status?: string | null
          transport_details?: Json | null
          transport_means_id?: number | null
          transport_type?: Database["public"]["Enums"]["transport_type_enum"]
          updated_at?: string
          vehicle_number?: string | null
        }
        Update: {
          active_allotment_business_id?: string | null
          allocation_code?: string | null
          arrival_offset_days?: number | null
          booking_closed_on?: string | null
          booking_id?: number | null
          carrier_code?: string | null
          created_at?: string
          departure_offset_days?: number | null
          id?: number
          offload_location_code?: string
          onload_location_code?: string
          pieces?: number | null
          sequence?: number
          status?: string | null
          transport_details?: Json | null
          transport_means_id?: number | null
          transport_type?: Database["public"]["Enums"]["transport_type_enum"]
          updated_at?: string
          vehicle_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_segment_offload_location_code_fkey"
            columns: ["offload_location_code"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_segment_offload_location_code_fkey"
            columns: ["offload_location_code"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_segment_onload_location_code_fkey"
            columns: ["onload_location_code"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_segment_onload_location_code_fkey"
            columns: ["onload_location_code"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      booking_segment_flight: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          aircraft_registration: string | null
          aircraft_type: string | null
          api_flight_id: string | null
          api_last_sync: string | null
          api_provider: string | null
          api_raw_data: Json | null
          booking_segment_id: number
          created_at: string
          flight_number: string
          id: number
          marketing_carrier: string | null
          operating_carrier: string | null
          scheduled_arrival: string
          scheduled_departure: string
          updated_at: string
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          aircraft_registration?: string | null
          aircraft_type?: string | null
          api_flight_id?: string | null
          api_last_sync?: string | null
          api_provider?: string | null
          api_raw_data?: Json | null
          booking_segment_id: number
          created_at?: string
          flight_number: string
          id?: number
          marketing_carrier?: string | null
          operating_carrier?: string | null
          scheduled_arrival: string
          scheduled_departure: string
          updated_at?: string
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          aircraft_registration?: string | null
          aircraft_type?: string | null
          api_flight_id?: string | null
          api_last_sync?: string | null
          api_provider?: string | null
          api_raw_data?: Json | null
          booking_segment_id?: number
          created_at?: string
          flight_number?: string
          id?: number
          marketing_carrier?: string | null
          operating_carrier?: string | null
          scheduled_arrival?: string
          scheduled_departure?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_segment_flight_marketing_fkey"
            columns: ["marketing_carrier"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_marketing_fkey"
            columns: ["marketing_carrier"]
            isOneToOne: false
            referencedRelation: "vw_airline_tariffs"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_marketing_fkey"
            columns: ["marketing_carrier"]
            isOneToOne: false
            referencedRelation: "vw_airline_tariffs_complete"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_marketing_fkey"
            columns: ["marketing_carrier"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["carrier_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_marketing_fkey"
            columns: ["marketing_carrier"]
            isOneToOne: false
            referencedRelation: "wv_airline_cargo_coefficients_view"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_operating_fkey"
            columns: ["operating_carrier"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_operating_fkey"
            columns: ["operating_carrier"]
            isOneToOne: false
            referencedRelation: "vw_airline_tariffs"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_operating_fkey"
            columns: ["operating_carrier"]
            isOneToOne: false
            referencedRelation: "vw_airline_tariffs_complete"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_operating_fkey"
            columns: ["operating_carrier"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["carrier_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_operating_fkey"
            columns: ["operating_carrier"]
            isOneToOne: false
            referencedRelation: "wv_airline_cargo_coefficients_view"
            referencedColumns: ["airline_code"]
          },
          {
            foreignKeyName: "booking_segment_flight_segment_fkey"
            columns: ["booking_segment_id"]
            isOneToOne: false
            referencedRelation: "booking_segment"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_special_handling: {
        Row: {
          booking_business_id: number
          created_at: string | null
          handling_code: string
        }
        Insert: {
          booking_business_id: number
          created_at?: string | null
          handling_code: string
        }
        Update: {
          booking_business_id?: number
          created_at?: string | null
          handling_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_special_handling_booking_business_id_fkey"
            columns: ["booking_business_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_special_handling_booking_business_id_fkey"
            columns: ["booking_business_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_special_handling_booking_business_id_fkey"
            columns: ["booking_business_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_special_handling_booking_business_id_fkey"
            columns: ["booking_business_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "booking_special_handling_booking_business_id_fkey"
            columns: ["booking_business_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_special_handling_handling_code_fkey"
            columns: ["handling_code"]
            isOneToOne: false
            referencedRelation: "special_handling_codes"
            referencedColumns: ["code"]
          },
        ]
      }
      booking_status_changes_queue: {
        Row: {
          booking_id: number
          context: Json | null
          created_at: string
          id: number
          last_error: string | null
          new_status: Database["public"]["Enums"]["booking_status"]
          old_status: Database["public"]["Enums"]["booking_status"] | null
          priority: number | null
          processed_at: string | null
          processing_attempts: number | null
        }
        Insert: {
          booking_id: number
          context?: Json | null
          created_at?: string
          id?: number
          last_error?: string | null
          new_status: Database["public"]["Enums"]["booking_status"]
          old_status?: Database["public"]["Enums"]["booking_status"] | null
          priority?: number | null
          processed_at?: string | null
          processing_attempts?: number | null
        }
        Update: {
          booking_id?: number
          context?: Json | null
          created_at?: string
          id?: number
          last_error?: string | null
          new_status?: Database["public"]["Enums"]["booking_status"]
          old_status?: Database["public"]["Enums"]["booking_status"] | null
          priority?: number | null
          processed_at?: string | null
          processing_attempts?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "fk_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "fk_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      booking_types: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          is_active: boolean
          name: string
          priority_level: number
          requires_special_handling: boolean
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          is_active?: boolean
          name: string
          priority_level?: number
          requires_special_handling?: boolean
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          is_active?: boolean
          name?: string
          priority_level?: number
          requires_special_handling?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      cargo_dry_ice: {
        Row: {
          booking_id: number | null
          created_at: string | null
          created_by: string
          id: string
          pieces: number | null
          total_weight_amount: number | null
          total_weight_unit: string | null
          updated_at: string | null
          weight_per_piece_amount: number | null
          weight_per_piece_unit: string | null
        }
        Insert: {
          booking_id?: number | null
          created_at?: string | null
          created_by: string
          id?: string
          pieces?: number | null
          total_weight_amount?: number | null
          total_weight_unit?: string | null
          updated_at?: string | null
          weight_per_piece_amount?: number | null
          weight_per_piece_unit?: string | null
        }
        Update: {
          booking_id?: number | null
          created_at?: string | null
          created_by?: string
          id?: string
          pieces?: number | null
          total_weight_amount?: number | null
          total_weight_unit?: string | null
          updated_at?: string | null
          weight_per_piece_amount?: number | null
          weight_per_piece_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cargo_dry_ice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_dry_ice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_dry_ice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_dry_ice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_dry_ice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      cargo_markings: {
        Row: {
          cargo_piece_id: number
          created_at: string
          created_by: string
          description: string | null
          id: number
          is_required: boolean
          marking_code: string
          marking_type: Database["public"]["Enums"]["marking_type_enum"]
        }
        Insert: {
          cargo_piece_id: number
          created_at?: string
          created_by: string
          description?: string | null
          id?: number
          is_required?: boolean
          marking_code: string
          marking_type: Database["public"]["Enums"]["marking_type_enum"]
        }
        Update: {
          cargo_piece_id?: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          is_required?: boolean
          marking_code?: string
          marking_type?: Database["public"]["Enums"]["marking_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "cargo_markings_cargo_piece_id_fkey"
            columns: ["cargo_piece_id"]
            isOneToOne: false
            referencedRelation: "cargo_pieces"
            referencedColumns: ["id"]
          },
        ]
      }
      cargo_measurements: {
        Row: {
          booking_id: number | null
          chargeable_weight_kg: number
          created_by: string | null
          id: number
          max_height_cm: number
          max_length_cm: number
          max_width_cm: number
          notes: string | null
          owner_id: string | null
          status: string
          total_pieces: number
          total_volume_cbm: number
          total_weight_kg: number
          updated_at: string
          verified_at: string | null
          verified_by: string | null
          volumetric_coefficient_id: number | null
        }
        Insert: {
          booking_id?: number | null
          chargeable_weight_kg?: number
          created_by?: string | null
          id?: number
          max_height_cm?: number
          max_length_cm?: number
          max_width_cm?: number
          notes?: string | null
          owner_id?: string | null
          status?: string
          total_pieces?: number
          total_volume_cbm?: number
          total_weight_kg?: number
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          volumetric_coefficient_id?: number | null
        }
        Update: {
          booking_id?: number | null
          chargeable_weight_kg?: number
          created_by?: string | null
          id?: number
          max_height_cm?: number
          max_length_cm?: number
          max_width_cm?: number
          notes?: string | null
          owner_id?: string | null
          status?: string
          total_pieces?: number
          total_volume_cbm?: number
          total_weight_kg?: number
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          volumetric_coefficient_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cargo_measurements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_measurements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_measurements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_measurements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_measurements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_measurements_volumetric_coefficient_id_fkey"
            columns: ["volumetric_coefficient_id"]
            isOneToOne: false
            referencedRelation: "airline_volumetric_coefficients"
            referencedColumns: ["id"]
          },
        ]
      }
      cargo_piece_special_handling: {
        Row: {
          cargo_piece_id: number
          created_at: string
          special_handling_code: string
        }
        Insert: {
          cargo_piece_id: number
          created_at?: string
          special_handling_code: string
        }
        Update: {
          cargo_piece_id?: number
          created_at?: string
          special_handling_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "cargo_piece_special_handling_cargo_piece_id_fkey"
            columns: ["cargo_piece_id"]
            isOneToOne: false
            referencedRelation: "cargo_pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargo_piece_special_handling_code_fkey"
            columns: ["special_handling_code"]
            isOneToOne: false
            referencedRelation: "special_handling_codes"
            referencedColumns: ["code"]
          },
        ]
      }
      cargo_pieces: {
        Row: {
          booking_id: number | null
          created_by: string | null
          handling_instructions: string | null
          height_cm: number
          id: number
          is_stackable: boolean
          length_cm: number
          nature_of_good: string | null
          piece_number: number
          quantity: number
          total_volume_cbm: number | null
          total_weight_kg: number | null
          weight_unit: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value: number
          width_cm: number
        }
        Insert: {
          booking_id?: number | null
          created_by?: string | null
          handling_instructions?: string | null
          height_cm: number
          id?: number
          is_stackable?: boolean
          length_cm: number
          nature_of_good?: string | null
          piece_number: number
          quantity?: number
          total_volume_cbm?: number | null
          total_weight_kg?: number | null
          weight_unit?: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value: number
          width_cm: number
        }
        Update: {
          booking_id?: number | null
          created_by?: string | null
          handling_instructions?: string | null
          height_cm?: number
          id?: number
          is_stackable?: boolean
          length_cm?: number
          nature_of_good?: string | null
          piece_number?: number
          quantity?: number
          total_volume_cbm?: number | null
          total_weight_kg?: number | null
          weight_unit?: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value?: number
          width_cm?: number
        }
        Relationships: [
          {
            foreignKeyName: "cargo_pieces_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_pieces_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_pieces_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "cargo_pieces_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "cargo_pieces_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      cargo_pieces_history: {
        Row: {
          booking_id: number | null
          change_reason: string | null
          changed_at: string
          changed_by: string
          created_by: string
          handling_code: string | null
          handling_instruction: string | null
          height_cm: number
          id: number
          is_stackable: boolean
          length_cm: number
          owner_id: string | null
          piece_number: number
          special_handling_codes: string[] | null
          version: number
          weight_unit: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value: number
          width_cm: number
        }
        Insert: {
          booking_id?: number | null
          change_reason?: string | null
          changed_at?: string
          changed_by: string
          created_by: string
          handling_code?: string | null
          handling_instruction?: string | null
          height_cm: number
          id: number
          is_stackable: boolean
          length_cm: number
          owner_id?: string | null
          piece_number: number
          special_handling_codes?: string[] | null
          version: number
          weight_unit: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value: number
          width_cm: number
        }
        Update: {
          booking_id?: number | null
          change_reason?: string | null
          changed_at?: string
          changed_by?: string
          created_by?: string
          handling_code?: string | null
          handling_instruction?: string | null
          height_cm?: number
          id?: number
          is_stackable?: boolean
          length_cm?: number
          owner_id?: string | null
          piece_number?: number
          special_handling_codes?: string[] | null
          version?: number
          weight_unit?: Database["public"]["Enums"]["weight_unit_enum"]
          weight_value?: number
          width_cm?: number
        }
        Relationships: []
      }
      cargo_types: {
        Row: {
          created_at: string
          default_handling: Json | null
          description: string | null
          iata_code: string | null
          id: number
          name: string
          required_documents: string[]
          special_handling_required: boolean
          type_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_handling?: Json | null
          description?: string | null
          iata_code?: string | null
          id?: number
          name: string
          required_documents?: string[]
          special_handling_required?: boolean
          type_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_handling?: Json | null
          description?: string | null
          iata_code?: string | null
          id?: number
          name?: string
          required_documents?: string[]
          special_handling_required?: boolean
          type_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      currency: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      dangerous_goods: {
        Row: {
          booking_id: number
          id: number
          proper_shipping_name: string
          un_number: string
        }
        Insert: {
          booking_id: number
          id?: number
          proper_shipping_name: string
          un_number: string
        }
        Update: {
          booking_id?: number
          id?: number
          proper_shipping_name?: string
          un_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "dangerous_goods_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "dangerous_goods_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "eawb_event_log"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "dangerous_goods_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "vw_full_awb_confirmed"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "dangerous_goods_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_booking_with_account_numbers"
            referencedColumns: ["businessId"]
          },
          {
            foreignKeyName: "dangerous_goods_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "wv_eawb_tracking_report"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      location: {
        Row: {
          cntr_code: string | null
          iata_code: string
          id: number
          name: string
          utc_offset: string | null
        }
        Insert: {
          cntr_code?: string | null
          iata_code: string
          id?: number
          name: string
          utc_offset?: string | null
        }
        Update: {
          cntr_code?: string | null
          iata_code?: string
          id?: number
          name?: string
          utc_offset?: string | null
        }
        Relationships: []
      }
      note_attachments: {
        Row: {
          created_at: string | null
          file_type: string | null
          file_url: string
          id: string
          note_id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          note_id: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          note_id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_attachments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_attachments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_attachments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_attachments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_categories: {
        Row: {
          applicable_types: Database["public"]["Enums"]["note_type"][] | null
          category_embedding: string | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          owner_id: string | null
        }
        Insert: {
          applicable_types?: Database["public"]["Enums"]["note_type"][] | null
          category_embedding?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          owner_id?: string | null
        }
        Update: {
          applicable_types?: Database["public"]["Enums"]["note_type"][] | null
          category_embedding?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          owner_id?: string | null
        }
        Relationships: []
      }
      note_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          note_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          note_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          note_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_comments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_comments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_comments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_comments_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_followers: {
        Row: {
          created_at: string | null
          id: string
          note_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          note_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          note_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_followers_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_followers_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_followers_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_followers_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_links: {
        Row: {
          created_at: string | null
          id: string
          link_type: string | null
          source_note_id: string
          target_note_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link_type?: string | null
          source_note_id: string
          target_note_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link_type?: string | null
          source_note_id?: string
          target_note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_notifications: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          is_read: boolean | null
          note_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          is_read?: boolean | null
          note_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          is_read?: boolean | null
          note_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_notifications_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_notifications_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_notifications_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_notifications_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_permissions: {
        Row: {
          created_at: string | null
          id: string
          note_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          note_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          note_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_permissions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_permissions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_permissions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_permissions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          note_id: string
          rating: number
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          note_id: string
          rating: number
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          note_id?: string
          rating?: number
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_ratings_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_ratings_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_ratings_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_ratings_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_ratings_reviewer_id_fkey1"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "note_ratings_reviewer_id_fkey1"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_ratings_reviewer_id_fkey1"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      note_reactions: {
        Row: {
          created_at: string | null
          id: string
          note_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          note_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          note_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_reactions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_reactions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_reactions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_reactions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_shares: {
        Row: {
          can_edit: boolean | null
          created_at: string | null
          id: string
          note_id: string | null
          shared_with: string | null
        }
        Insert: {
          can_edit?: boolean | null
          created_at?: string | null
          id?: string
          note_id?: string | null
          shared_with?: string | null
        }
        Update: {
          can_edit?: boolean | null
          created_at?: string | null
          id?: string
          note_id?: string | null
          shared_with?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_shares_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_shares_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_shares_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_shares_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_tag_map: {
        Row: {
          note_id: string
          tag_id: string
        }
        Insert: {
          note_id: string
          tag_id: string
        }
        Update: {
          note_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_tag_map_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tag_map_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tag_map_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tag_map_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tag_map_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "note_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      note_tags: {
        Row: {
          category_id: string | null
          id: string
          is_system_tag: boolean | null
          name: string
          synonyms: string[] | null
          tag_embedding: string | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          is_system_tag?: boolean | null
          name: string
          synonyms?: string[] | null
          tag_embedding?: string | null
        }
        Update: {
          category_id?: string | null
          id?: string
          is_system_tag?: boolean | null
          name?: string
          synonyms?: string[] | null
          tag_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      note_tasks: {
        Row: {
          ai_generated: boolean | null
          assignee: string | null
          content: string
          created_at: string | null
          due_date: string | null
          estimated_time: unknown | null
          id: string
          is_completed: boolean | null
          note_id: string
          priority: number | null
          task_type: Database["public"]["Enums"]["note_type"] | null
        }
        Insert: {
          ai_generated?: boolean | null
          assignee?: string | null
          content: string
          created_at?: string | null
          due_date?: string | null
          estimated_time?: unknown | null
          id?: string
          is_completed?: boolean | null
          note_id: string
          priority?: number | null
          task_type?: Database["public"]["Enums"]["note_type"] | null
        }
        Update: {
          ai_generated?: boolean | null
          assignee?: string | null
          content?: string
          created_at?: string | null
          due_date?: string | null
          estimated_time?: unknown | null
          id?: string
          is_completed?: boolean | null
          note_id?: string
          priority?: number | null
          task_type?: Database["public"]["Enums"]["note_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "note_tasks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tasks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tasks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_tasks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_versions: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          id: string
          note_id: string
          title: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          note_id: string
          title?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          note_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_versions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_versions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_versions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_versions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          ai_confidence: number | null
          author_id: string
          category_id: string | null
          content: string
          created_at: string | null
          embedding: string | null
          expires_at: string | null
          id: string
          is_archived: boolean | null
          is_public: boolean | null
          metadata: Json | null
          parent_id: string | null
          previous_version_id: string | null
          priority: number | null
          related_notes: string[] | null
          subcategory: string | null
          title: string | null
          type: Database["public"]["Enums"]["note_type"] | null
          updated_at: string | null
          urgency: number | null
          version: number | null
        }
        Insert: {
          ai_confidence?: number | null
          author_id: string
          category_id?: string | null
          content: string
          created_at?: string | null
          embedding?: string | null
          expires_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_public?: boolean | null
          metadata?: Json | null
          parent_id?: string | null
          previous_version_id?: string | null
          priority?: number | null
          related_notes?: string[] | null
          subcategory?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["note_type"] | null
          updated_at?: string | null
          urgency?: number | null
          version?: number | null
        }
        Update: {
          ai_confidence?: number | null
          author_id?: string
          category_id?: string | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          expires_at?: string | null
          id?: string
          is_archived?: boolean | null
          is_public?: boolean | null
          metadata?: Json | null
          parent_id?: string | null
          previous_version_id?: string | null
          priority?: number | null
          related_notes?: string[] | null
          subcategory?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["note_type"] | null
          updated_at?: string | null
          urgency?: number | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant: {
        Row: {
          account_number: string | null
          additional_name: string | null
          created_at: string
          created_by: string | null
          id: number
          name: string
          short_name: string | null
          status: Database["public"]["Enums"]["agent_status_enum"] | null
          type: Database["public"]["Enums"]["client_type_enum"] | null
          updated_at: string
        }
        Insert: {
          account_number?: string | null
          additional_name?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          name: string
          short_name?: string | null
          status?: Database["public"]["Enums"]["agent_status_enum"] | null
          type?: Database["public"]["Enums"]["client_type_enum"] | null
          updated_at?: string
        }
        Update: {
          account_number?: string | null
          additional_name?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string
          short_name?: string | null
          status?: Database["public"]["Enums"]["agent_status_enum"] | null
          type?: Database["public"]["Enums"]["client_type_enum"] | null
          updated_at?: string
        }
        Relationships: []
      }
      participant_address: {
        Row: {
          additional_address: string | null
          address: string
          city: string
          country_code: string
          country_name: string
          created_at: string
          created_by: string | null
          entrepreneur_name: string | null
          entrepreneur_type: string | null
          id: number
          inn: string | null
          is_active: boolean | null
          ogrn: string | null
          okved: string | null
          participant_id: number
          registration_date: string | null
          state_or_province: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          additional_address?: string | null
          address: string
          city: string
          country_code: string
          country_name: string
          created_at?: string
          created_by?: string | null
          entrepreneur_name?: string | null
          entrepreneur_type?: string | null
          id?: number
          inn?: string | null
          is_active?: boolean | null
          ogrn?: string | null
          okved?: string | null
          participant_id: number
          registration_date?: string | null
          state_or_province?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          additional_address?: string | null
          address?: string
          city?: string
          country_code?: string
          country_name?: string
          created_at?: string
          created_by?: string | null
          entrepreneur_name?: string | null
          entrepreneur_type?: string | null
          id?: number
          inn?: string | null
          is_active?: boolean | null
          ogrn?: string | null
          okved?: string | null
          participant_id?: number
          registration_date?: string | null
          state_or_province?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_address_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_contact: {
        Row: {
          contact_person: string | null
          created_at: string
          email: string | null
          fax_number: string | null
          id: number
          participant_id: number
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          fax_number?: string | null
          id?: number
          participant_id: number
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          fax_number?: string | null
          id?: number
          participant_id?: number
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_contact_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      shipment_measurements: {
        Row: {
          chargeable_weight_id: number | null
          created_at: string | null
          id: number
          total_volume_id: number | null
          total_weight_id: number | null
          updated_at: string | null
        }
        Insert: {
          chargeable_weight_id?: number | null
          created_at?: string | null
          id?: number
          total_volume_id?: number | null
          total_weight_id?: number | null
          updated_at?: string | null
        }
        Update: {
          chargeable_weight_id?: number | null
          created_at?: string | null
          id?: number
          total_volume_id?: number | null
          total_weight_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      special_handling_attributes: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      special_handling_codes: {
        Row: {
          cargo_category: string | null
          code: string
          created_at: string | null
          description: string
          is_dangerous_goods: boolean
          is_special_cargo: boolean
          requires_ramp_attention: boolean
          storage_days: number
          updated_at: string | null
        }
        Insert: {
          cargo_category?: string | null
          code: string
          created_at?: string | null
          description: string
          is_dangerous_goods?: boolean
          is_special_cargo?: boolean
          requires_ramp_attention?: boolean
          storage_days?: number
          updated_at?: string | null
        }
        Update: {
          cargo_category?: string | null
          code?: string
          created_at?: string | null
          description?: string
          is_dangerous_goods?: boolean
          is_special_cargo?: boolean
          requires_ramp_attention?: boolean
          storage_days?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      system_config: {
        Row: {
          description: string | null
          id: number
          key: string
          updated_at: string | null
          updated_by: string | null
          value: string
        }
        Insert: {
          description?: string | null
          id?: number
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: string
        }
        Update: {
          description?: string | null
          id?: number
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          department: string | null
          full_name: string | null
          id: string
          phone: string | null
          role_id: string | null
          telegram_link: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role_id?: string | null
          telegram_link?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role_id?: string | null
          telegram_link?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          context: Json | null
          role_id: string
          user_id: string
        }
        Insert: {
          context?: Json | null
          role_id: string
          user_id: string
        }
        Update: {
          context?: Json | null
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      eawb_event_log: {
        Row: {
          awb_ref: string | null
          booking_id: number | null
          details: Json | null
          eventTime: string | null
          eventType:
            | Database["public"]["Enums"]["booking_eawb_event_type"]
            | null
          related_message_type: string | null
          user_email: string | null
        }
        Relationships: []
      }
      notes_with_profiles: {
        Row: {
          ai_confidence: number | null
          author_id: string | null
          avatar_url: string | null
          category_id: string | null
          content: string | null
          created_at: string | null
          embedding: string | null
          expires_at: string | null
          full_name: string | null
          id: string | null
          is_archived: boolean | null
          is_public: boolean | null
          metadata: Json | null
          parent_id: string | null
          previous_version_id: string | null
          priority: number | null
          related_notes: string[] | null
          subcategory: string | null
          title: string | null
          type: Database["public"]["Enums"]["note_type"] | null
          updated_at: string | null
          urgency: number | null
          user_id: string | null
          username: string | null
          version: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      v_awb_stock_summary: {
        Row: {
          agent_id: number | null
          available_awbs: number | null
          cancelled_awbs: number | null
          stock_id: number | null
          total_awbs: number | null
          used_awbs: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awb_stocks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      v_awbs_by_stock: {
        Row: {
          agent_id: number | null
          awb_number: string | null
          awb_stock_id: number | null
          created_at: string | null
          issued: boolean | null
          issued_at: string | null
          status: string | null
          stock_id: number | null
          stock_source: string | null
          used_for_booking_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awb_stocks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "awb_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awb_stock_summary"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awbs_by_stock"
            referencedColumns: ["stock_id"]
          },
        ]
      }
      vw_airline_tariffs: {
        Row: {
          airline_code: string | null
          airline_name: string | null
          cargo_type: string | null
          currency: string | null
          default_storage_days: number | null
          destination: string | null
          destination_country_code: string | null
          destination_name: string | null
          destination_timezone: string | null
          includes_vat: boolean | null
          is_dangerous_goods: boolean | null
          is_special_cargo: boolean | null
          min_rate: number | null
          origin: string | null
          origin_country_code: string | null
          origin_name: string | null
          origin_timezone: string | null
          product_code: string | null
          product_name: string | null
          rate_100_300: number | null
          rate_300_500: number | null
          rate_500_1000: number | null
          rate_over_1000: number | null
          rate_under_100: number | null
          requires_ramp_attention: boolean | null
          tariff_type: Database["public"]["Enums"]["tariff_type_enum"] | null
          valid_from: string | null
          valid_to: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      vw_airline_tariffs_complete: {
        Row: {
          airline_code: string | null
          airline_name: string | null
          cargo_type: string | null
          currency: string | null
          default_storage_days: number | null
          destination: string | null
          destination_country_code: string | null
          destination_name: string | null
          flat_rate: number | null
          includes_vat: boolean | null
          is_dangerous_goods: boolean | null
          is_special_cargo: boolean | null
          min_rate: number | null
          origin: string | null
          origin_country_code: string | null
          origin_name: string | null
          product_code: string | null
          product_name: string | null
          rate_100_300: number | null
          rate_300_500: number | null
          rate_500_1000: number | null
          rate_over_1000: number | null
          rate_under_100: number | null
          requires_ramp_attention: boolean | null
          tariff_type: Database["public"]["Enums"]["tariff_type_enum"] | null
          tariff_type_description: string | null
          valid_from: string | null
          valid_to: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "airline_tariffs_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      vw_full_awb_confirmed: {
        Row: {
          airwaybillsIssuedOn: string | null
          awb_number: string | null
          awb_ref: string | null
          awb_status: string | null
          booking_id: number | null
          bookingStatus: Database["public"]["Enums"]["booking_status"] | null
          carrier_code: string | null
          carrier_name: string | null
          chargeable_weight: number | null
          commodity: string | null
          consignee_address: string | null
          consignee_city: string | null
          consignee_country: string | null
          consignee_name: string | null
          createdAt: string | null
          customs_destination_code: string | null
          customs_origin_code: string | null
          declared_value_carriage: number | null
          declared_value_customs: number | null
          destination: string | null
          destination_name: string | null
          insurance_currency: string | null
          insurance_value: number | null
          nature_of_goods: string | null
          origin: string | null
          origin_name: string | null
          payment_method: string | null
          pieces: number | null
          route_segments: Json | null
          service_level: string | null
          shipper_address: string | null
          shipper_city: string | null
          shipper_country: string | null
          shipper_name: string | null
          special_handling_codes: string[] | null
          supplementary_control_information: string | null
          updated_at: string | null
          volume: number | null
          weight: number | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_customs_security_insurance_currency_fkey"
            columns: ["insurance_currency"]
            isOneToOne: false
            referencedRelation: "currency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      vw_location_details: {
        Row: {
          country_code: string | null
          iata_code: string | null
          location_name: string | null
          timezone_offset: string | null
        }
        Insert: {
          country_code?: string | null
          iata_code?: string | null
          location_name?: string | null
          timezone_offset?: string | null
        }
        Update: {
          country_code?: string | null
          iata_code?: string | null
          location_name?: string | null
          timezone_offset?: string | null
        }
        Relationships: []
      }
      vw_notes_with_profiles: {
        Row: {
          ai_confidence: number | null
          author_id: string | null
          avatar_url: string | null
          category_id: string | null
          content: string | null
          created_at: string | null
          embedding: string | null
          expires_at: string | null
          full_name: string | null
          id: string | null
          is_archived: boolean | null
          is_public: boolean | null
          metadata: Json | null
          parent_id: string | null
          previous_version_id: string | null
          priority: number | null
          related_notes: string[] | null
          subcategory: string | null
          title: string | null
          type: Database["public"]["Enums"]["note_type"] | null
          updated_at: string | null
          urgency: number | null
          username: string | null
          version: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw_notes_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "vw2_notes_with_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vw2_notes_with_profiles: {
        Row: {
          author_id: string | null
          avatar_url: string | null
          category_description: string | null
          category_id: string | null
          category_name: string | null
          content: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          is_public: boolean | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      wv_airline_cargo_coefficients_view: {
        Row: {
          airline_code: string | null
          airline_name: string | null
          cargo_type_code: string | null
          cargo_type_name: string | null
          coefficient: number | null
          min_chargeable_weight: number | null
          required_documents: string[] | null
          special_handling_required: boolean | null
          valid_from: string | null
          valid_to: string | null
        }
        Relationships: []
      }
      wv_available_awbs: {
        Row: {
          awb_number: string | null
          awb_stock_id: number | null
          created_at: string | null
          id: number | null
          issued: boolean | null
          issued_at: string | null
          owner_agent_id: number | null
          status: string | null
          stock_source: string | null
          updated_at: string | null
          used_for_booking_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "awb_stocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awb_stock_summary"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "awbs_awb_stock_id_fkey"
            columns: ["awb_stock_id"]
            isOneToOne: false
            referencedRelation: "v_awbs_by_stock"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "awbs_owner_agent_id_fkey"
            columns: ["owner_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      wv_booking_with_account_numbers: {
        Row: {
          agent_account_number: string | null
          agent_name: string | null
          awb_ref: string | null
          bookingType: string | null
          businessId: number | null
          consignee_account_number: string | null
          consignee_name: string | null
          consolidation: boolean | null
          createdAt: string | null
          destination: string | null
          origin: string | null
          shipper_account_number: string | null
          shipper_name: string | null
          updatedAt: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_bookingType_fkey"
            columns: ["bookingType"]
            isOneToOne: false
            referencedRelation: "booking_types"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_destination_fkey"
            columns: ["destination"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["iata_code"]
          },
          {
            foreignKeyName: "booking_origin_fkey"
            columns: ["origin"]
            isOneToOne: false
            referencedRelation: "vw_location_details"
            referencedColumns: ["iata_code"]
          },
        ]
      }
      wv_eawb_tracking_report: {
        Row: {
          awb_ref: string | null
          booking_id: number | null
          bookingStatus: Database["public"]["Enums"]["booking_status"] | null
          carrier_ack_time: string | null
          eawb_status: Database["public"]["Enums"]["eawb_status_type"] | null
          event_count: number | null
          freight_on_hand_time: string | null
          fwb_sent_time: string | null
          ready_for_carriage_time: string | null
          securityStatus:
            | Database["public"]["Enums"]["booking_eawb_security_status"]
            | null
          specialHandlingCode:
            | Database["public"]["Enums"]["eawb_document_type"]
            | null
          workflow_status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_detect_note_type: {
        Args: { content: string }
        Returns: Database["public"]["Enums"]["note_type"]
      }
      batch_update_note_types: {
        Args: { batch_size?: number }
        Returns: number
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      calculate_ai_confidence: {
        Args: {
          content: string
          note_type_val: Database["public"]["Enums"]["note_type"]
        }
        Returns: number
      }
      calculate_package_volume: {
        Args: {
          p_is_uniform: boolean
          p_package_id?: number
          p_total_pieces: number
          p_uniform_height: number
          p_uniform_length: number
          p_uniform_width: number
        }
        Returns: number
      }
      check_eawb_compliance: {
        Args: { booking_id: number }
        Returns: Json
      }
      create_booking_minimal: {
        Args: {
          p_agent: number
          p_booking_type?: string
          p_commodity?: string
          p_consignee: number
          p_created_by?: string
          p_destination: string
          p_is_eawb?: boolean
          p_nature_of_goods?: string
          p_origin: string
          p_owner_id?: string
          p_service_level?: string
          p_shipper: number
        }
        Returns: {
          bookingstatus: Database["public"]["Enums"]["booking_status"]
          businessid: number
          createdat: string
        }[]
      }
      create_full_booking: {
        Args: {
          p_agent: number
          p_booking_type: string
          p_carrier: number
          p_chargeable_weight_kg?: number
          p_commodity: string
          p_consignee: number
          p_created_by: string
          p_declared_value_carriage?: number
          p_declared_value_customs?: number
          p_delivery_remarks?: string
          p_destination: string
          p_is_eawb: boolean
          p_nature_of_goods: string
          p_origin: string
          p_owner_id: string
          p_payment_method: string
          p_pieces?: number
          p_remarks?: string
          p_service_level: string
          p_shipper: number
          p_special_handling_codes?: string[]
          p_volume_cbm?: number
          p_weight_kg?: number
        }
        Returns: {
          booking_id: number
          booking_status: string
          cargo_measurements_id: number
          created_at: string
          eawb_data_id: number
        }[]
      }
      detect_complexity: {
        Args: { content: string }
        Returns: string
      }
      detect_general_category: {
        Args: { content: string }
        Returns: string
      }
      detect_language: {
        Args: { text: string }
        Returns: string
      }
      detect_priority_level: {
        Args: { content: string }
        Returns: number
      }
      detect_urgency_level: {
        Args: { content: string }
        Returns: number
      }
      evaluate_classification_accuracy: {
        Args: { sample_size?: number }
        Returns: {
          accuracy_rate: number
          correct_classifications: number
          most_common_errors: Json
          total_samples: number
        }[]
      }
      extract_airline_code: {
        Args: { content: string }
        Returns: string
      }
      extract_processing_time: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      generate_awb_serial: {
        Args:
          | {
              p_agent_id?: number
              p_booking_id: number
              p_prefix: string
              p_reference_type?: string
              p_use_airline_rules?: boolean
            }
          | { p_prefix?: string }
        Returns: string
      }
      generate_fwb_message: {
        Args: { p_booking_id: number }
        Returns: string
      }
      generate_username: {
        Args: { email: string }
        Returns: string
      }
      get_ai_model_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_embedding: {
        Args: { text: string }
        Returns: string
      }
      get_embedding_via_edge: {
        Args: { text: string }
        Returns: string
      }
      get_note_average_rating: {
        Args: { note_id_param: string }
        Returns: number
      }
      get_note_type_description: {
        Args: { note_type_val: Database["public"]["Enums"]["note_type"] }
        Returns: string
      }
      has_permission: {
        Args: { permission_name: string; user_id: string }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { data: Json; uri: string } | { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { content: string; content_type: string; uri: string }
          | { data: Json; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      iata_to_digits: {
        Args: { iata_code: string }
        Returns: string
      }
      process_booking_status_queue: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      process_cancellation: {
        Args: { booking_id: number; context: Json }
        Returns: undefined
      }
      process_reinstatement: {
        Args: { booking_id: number; context: Json }
        Returns: undefined
      }
      search_notes_by_context: {
        Args: {
          airlines?: string[]
          min_priority?: number
          note_types?: Database["public"]["Enums"]["note_type"][]
          search_query: string
        }
        Returns: {
          ai_confidence: number | null
          author_id: string
          category_id: string | null
          content: string
          created_at: string | null
          embedding: string | null
          expires_at: string | null
          id: string
          is_archived: boolean | null
          is_public: boolean | null
          metadata: Json | null
          parent_id: string | null
          previous_version_id: string | null
          priority: number | null
          related_notes: string[] | null
          subcategory: string | null
          title: string | null
          type: Database["public"]["Enums"]["note_type"] | null
          updated_at: string | null
          urgency: number | null
          version: number | null
        }[]
      }
      sync_single_booking: {
        Args: { p_booking_id: number }
        Returns: undefined
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      update_cargo_measurement_stats: {
        Args: { p_measurement_id: number }
        Returns: undefined
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
      zero_shot_classify_type: {
        Args: { content: string }
        Returns: Database["public"]["Enums"]["note_type"]
      }
    }
    Enums: {
      agent_status_enum:
        | "Active"
        | "Old_Code"
        | "Black_List"
        | "Out_of_Business"
        | "Inactive"
        | "No_Invoice"
        | "Invoice"
        | "Cash"
        | "Debit_Note"
        | "Shipper_Inv"
        | "Tech_Stores"
      booking_eawb_event_type:
        | "FWB_SENT"
        | "FMA_RECEIVED"
        | "FNA_RECEIVED"
        | "FOH_RECEIVED"
        | "RCS_RECEIVED"
        | "SECURITY_CHECKED"
        | "DISCREPANCY_FOUND"
        | "DISCREPANCY_RESOLVED"
        | "CARGO_ACCEPTED"
        | "READY_FOR_CARRIAGE"
      booking_eawb_security_status:
        | "NOT_CHECKED"
        | "SECURED"
        | "UNSECURED"
        | "SCREENED"
        | "EXEMPT"
      booking_reference_type: "BOOK" | "QUOTE" | "AIR_WAYBILL"
      booking_status:
        | "CONFIRMED"
        | "RCS"
        | "FLOWN"
        | "CLOSED"
        | "DRAFT"
        | "UNCONFIRMED"
        | "CANCELLED"
      charge_code_enum:
        | "CA"
        | "CB"
        | "CC"
        | "CG"
        | "CP"
        | "CX"
        | "NC"
        | "PC"
        | "PD"
        | "PG"
        | "PP"
        | "PX"
        | "XA"
        | "XB"
      client_type_enum:
        | "Agent"
        | "Shipper"
        | "Consignee"
        | "Notifier"
        | "Station"
      data_capture_status: "INCOMPLETE" | "COMPLETED"
      eawb_document_type: "ECC" | "ECP" | "EAW" | "EAP"
      eawb_status_type:
        | "CREATED"
        | "DATA_SENT"
        | "FOH_RECEIVED"
        | "RCS_CONFIRMED"
        | "ERROR"
        | "UPDATED"
        | "CANCELLED"
      hierarchy_type_enum: "Master" | "Regional" | "Global" | "Local"
      marking_type_enum:
        | "GENERAL_WARNING"
        | "TEMPERATURE"
        | "HAZARDOUS"
        | "SPECIAL_HANDLING"
        | "MANIPULATION"
        | "ENVIRONMENTAL"
        | "OTHER"
      note_type:
        | "note"
        | "quick_note"
        | "bookmark"
        | "procedure"
        | "checklist"
        | "template"
        | "sop"
        | "workflow"
        | "problem"
        | "incident"
        | "solution"
        | "workaround"
        | "risk"
        | "client_request"
        | "client_feedback"
        | "complaint"
        | "approval"
        | "email"
        | "message"
        | "meeting_notes"
        | "call_summary"
        | "knowledge_base"
        | "training"
        | "best_practice"
        | "lesson_learned"
        | "reminder"
        | "alert"
        | "auto_generated"
        | "system_log"
        | "booking_notes"
        | "flight_notes"
        | "airline_notes"
        | "airport_notes"
        | "emergency"
        | "legal"
        | "compliance"
        | "audit"
        | "task"
      participant_type_enum:
        | "AGT"
        | "SHP"
        | "CNE"
        | "AIR"
        | "APT"
        | "BRK"
        | "CAG"
        | "CTM"
        | "DEC"
        | "FFW"
        | "GHA"
        | "PTT"
        | "TRK"
        | "AMP"
        | "AMF"
        | "AMA"
      tariff_type_enum: "WEIGHT_BASED" | "FLAT_RATE"
      transport_type_enum: "AIR" | "TRK" | "SEA" | "RAIL" | "MIX"
      volume_unit_enum: "MC" | "CF"
      weight_unit_enum: "KG" | "LB"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_status_enum: [
        "Active",
        "Old_Code",
        "Black_List",
        "Out_of_Business",
        "Inactive",
        "No_Invoice",
        "Invoice",
        "Cash",
        "Debit_Note",
        "Shipper_Inv",
        "Tech_Stores",
      ],
      booking_eawb_event_type: [
        "FWB_SENT",
        "FMA_RECEIVED",
        "FNA_RECEIVED",
        "FOH_RECEIVED",
        "RCS_RECEIVED",
        "SECURITY_CHECKED",
        "DISCREPANCY_FOUND",
        "DISCREPANCY_RESOLVED",
        "CARGO_ACCEPTED",
        "READY_FOR_CARRIAGE",
      ],
      booking_eawb_security_status: [
        "NOT_CHECKED",
        "SECURED",
        "UNSECURED",
        "SCREENED",
        "EXEMPT",
      ],
      booking_reference_type: ["BOOK", "QUOTE", "AIR_WAYBILL"],
      booking_status: [
        "CONFIRMED",
        "RCS",
        "FLOWN",
        "CLOSED",
        "DRAFT",
        "UNCONFIRMED",
        "CANCELLED",
      ],
      charge_code_enum: [
        "CA",
        "CB",
        "CC",
        "CG",
        "CP",
        "CX",
        "NC",
        "PC",
        "PD",
        "PG",
        "PP",
        "PX",
        "XA",
        "XB",
      ],
      client_type_enum: [
        "Agent",
        "Shipper",
        "Consignee",
        "Notifier",
        "Station",
      ],
      data_capture_status: ["INCOMPLETE", "COMPLETED"],
      eawb_document_type: ["ECC", "ECP", "EAW", "EAP"],
      eawb_status_type: [
        "CREATED",
        "DATA_SENT",
        "FOH_RECEIVED",
        "RCS_CONFIRMED",
        "ERROR",
        "UPDATED",
        "CANCELLED",
      ],
      hierarchy_type_enum: ["Master", "Regional", "Global", "Local"],
      marking_type_enum: [
        "GENERAL_WARNING",
        "TEMPERATURE",
        "HAZARDOUS",
        "SPECIAL_HANDLING",
        "MANIPULATION",
        "ENVIRONMENTAL",
        "OTHER",
      ],
      note_type: [
        "note",
        "quick_note",
        "bookmark",
        "procedure",
        "checklist",
        "template",
        "sop",
        "workflow",
        "problem",
        "incident",
        "solution",
        "workaround",
        "risk",
        "client_request",
        "client_feedback",
        "complaint",
        "approval",
        "email",
        "message",
        "meeting_notes",
        "call_summary",
        "knowledge_base",
        "training",
        "best_practice",
        "lesson_learned",
        "reminder",
        "alert",
        "auto_generated",
        "system_log",
        "booking_notes",
        "flight_notes",
        "airline_notes",
        "airport_notes",
        "emergency",
        "legal",
        "compliance",
        "audit",
        "task",
      ],
      participant_type_enum: [
        "AGT",
        "SHP",
        "CNE",
        "AIR",
        "APT",
        "BRK",
        "CAG",
        "CTM",
        "DEC",
        "FFW",
        "GHA",
        "PTT",
        "TRK",
        "AMP",
        "AMF",
        "AMA",
      ],
      tariff_type_enum: ["WEIGHT_BASED", "FLAT_RATE"],
      transport_type_enum: ["AIR", "TRK", "SEA", "RAIL", "MIX"],
      volume_unit_enum: ["MC", "CF"],
      weight_unit_enum: ["KG", "LB"],
    },
  },
} as const


export type NoteRow = Database['public']['Tables']['notes']['Row'];
export type NoteInsert = Database['public']['Tables']['notes']['Insert'];
export type NoteUpdate = Database['public']['Tables']['notes']['Update'];

export type CategoryRow = Database['public']['Tables']['note_categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['note_categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['note_categories']['Update'];
