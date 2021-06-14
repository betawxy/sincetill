import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sincetill/models/item_model.dart';

class ItemStore {
  final String uid;

  ItemStore(this.uid);

  CollectionReference<Item> _getItemsRef() {
    return FirebaseFirestore.instance
        .collection('users')
        .doc(uid)
        .collection('items')
        .withConverter<Item>(
          fromFirestore: (snapshots, _) => Item.fromJson(snapshots.data()!),
          toFirestore: (item, _) => item.toJson(),
        );
  }

  Future<DocumentReference<Item>> addToStore(Item item) async {
    return await _getItemsRef().add(item);
  }

  Stream<QuerySnapshot<Item>> get items async* {
    yield* _getItemsRef().orderBy('ts').snapshots();
  }
}
