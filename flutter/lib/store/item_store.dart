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
    var res = _getItemsRef().doc(item.id);
    await res.set(item);
    return res;
  }

  Stream<QuerySnapshot<Item>> get items async* {
    yield* _getItemsRef().orderBy('ts').snapshots();
  }

  Future<List<Item>> allItems() async {
    QuerySnapshot<Item> s = await _getItemsRef().get();
    List<QueryDocumentSnapshot<Item>> docs = s.docs;
    return docs.map((e) => e.data()).toList();
  }

  Future<void> delete(Item item) async {
    return _getItemsRef().doc(item.id).delete();
  }

  Future<DocumentReference<Item>> updateItem(Item item) async {
    var res = _getItemsRef().doc(item.id);
    await res.update(item.toJson());
    return res;
  }

  Future<Item?> queryItem(String id) async {
    DocumentSnapshot<Item> snapshot = await _getItemsRef().doc(id).get();
    return snapshot.data();
  }
}
