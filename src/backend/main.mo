import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  // Company Information
  var companyInfo = {
    name = "Pranitha Computers";
    address = "123 Tech Park, Hyderabad, India";
    phone = "+91 98765 43210";
    description = "Pranitha Computers provides IT services including software development, system integration, and IT consulting.";
  };

  // Service Type
  type Service = {
    id : Nat;
    name : Text;
    description : Text;
  };

  // Services Storage (Persistent)
  let services = Map.empty<Nat, Service>();

  // Add sample services (not persistent)
  public shared ({ caller }) func addSampleServices() : async () {
    if (services.isEmpty()) {
      services.add(
        1,
        {
          id = 1;
          name = "Software Development";
          description = "Custom software solutions tailored to your business needs.";
        },
      );

      services.add(
        2,
        {
          id = 2;
          name = "System Integration";
          description = "Integrating various IT systems for seamless data flow and operations.";
        },
      );
    };
  };

  // Get Company Info
  public query ({ caller }) func getCompanyInfo() : async {
    name : Text;
    address : Text;
    phone : Text;
    description : Text;
  } {
    companyInfo;
  };

  // Get All Services
  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray();
  };

  // Get Single Service by ID
  public query ({ caller }) func getService(id : Nat) : async Service {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  // Update Company Info
  public shared ({ caller }) func updateCompanyInfo(
    name : Text,
    address : Text,
    phone : Text,
    description : Text,
  ) : async () {
    companyInfo := {
      name;
      address;
      phone;
      description;
    };
  };
};
