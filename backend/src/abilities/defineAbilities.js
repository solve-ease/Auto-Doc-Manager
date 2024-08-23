import { AbilityBuilder, createMongoAbility } from '@casl/ability';

// Define roles and permissions
function defineAbilitiesFor(role) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    switch (role) {
        case 'documentIssuer':
            can('create', 'Document');    // Document Issuer can create documents
            can('update', 'Document');    // Document Issuer can update documents
            can('delete', 'Document');    // Document Issuer can delete documents
            can('read', 'Document');      // Document Issuer can read documents
            break;

        case 'verifier':
            can('read', 'Document');      // Verifier can read documents
            can('verify', 'Document');    // Verifier can verify documents
            cannot('create', 'Document'); // Verifier cannot create documents
            cannot('update', 'Document'); // Verifier cannot update documents
            cannot('delete', 'Document'); // Verifier cannot delete documents
            break;

        case 'normalUser':
            can('read', 'Document');      // Normal User can read documents
            cannot('create', 'Document'); // Normal User cannot create documents
            cannot('update', 'Document'); // Normal User cannot update documents
            cannot('delete', 'Document'); // Normal User cannot delete documents
            cannot('verify', 'Document'); // Normal User cannot verify documents
            break;

        default:
            can('read', 'Document', { published: true }); // Default role, can read published documents only
            break;
    }

    return build();
}

// Example usage
const normalUserAbilities = defineAbilitiesFor('normalUser');
const documentIssuerAbilities = defineAbilitiesFor('documentIssuer');
const verifierAbilities = defineAbilitiesFor('verifier');

console.log(normalUserAbilities.can('read', 'Document')); // true
console.log(documentIssuerAbilities.can('create', 'Document')); // true
console.log(verifierAbilities.can('verify', 'Document')); // true
