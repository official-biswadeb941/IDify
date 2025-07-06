module addr::registry_v2 {
    use std::vector;
    use std::signer;
    use std::timestamp;

    /// Represents a credential issued by an issuer to a recipient.
    struct Credential has copy, drop, store {
        issuer: address,
        recipient: address,
        recipient_name: vector<u8>,
        title: vector<u8>,
        institute: vector<u8>,
        issued_at: u64,
    }

    /// A user's resume containing a list of credentials.
    struct Resume has key, copy, drop, store {
        credentials: vector<Credential>,
    }

    /// Initializes a resume for the caller's account.
    public entry fun init_account(account: &signer) {
        let addr = signer::address_of(account);
        if (!exists<Resume>(addr)) {
            move_to(account, Resume {
                credentials: vector::empty<Credential>()
            });
        }
    }

    /// Issues a credential from the issuer to the recipient.
    /// The recipient must have already initialized their account.
    public entry fun issue_credential(
        issuer: &signer,
        recipient: address,
        recipient_name: vector<u8>,
        title: vector<u8>,
        institute: vector<u8>
    ) acquires Resume {
        if (!exists<Resume>(recipient)) {
            abort 1001; // recipient must call init_account first
        };

        let new_cred = Credential {
            issuer: signer::address_of(issuer),
            recipient,
            recipient_name,
            title,
            institute,
            issued_at: timestamp::now_seconds(),
        };

        let resume = borrow_global_mut<Resume>(recipient);
        vector::push_back(&mut resume.credentials, new_cred);
    }

    /// Returns a full copy of the resume for a given user address.
    public fun get_resume(user: address): Resume acquires Resume {
        *borrow_global<Resume>(user)
    }
}
