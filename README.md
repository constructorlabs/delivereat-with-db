# Delivereat

Repeat of Delivereat project with database.


This Readme is regarding experimental branch, which is more fully featured, but currently quite buggy. The master branch does not have burger customisation features.

NOTE: Due to styling issues, the project displays correctly only on larger mobile screens. (iPhone 6/7/8 Plus, iPhone X etc.). I have tried to rectify this but completely clueless as to what causes the menu to shrink and elements overlap each other.


## Features:

* Burgers can be customised with additional toppings. This works via additonal "toppings" and "toppings_map" tables in the database, and nested promises within the post request.

*
## Issues

* As mentioned above, styling is not correct.

* UX is not complete. I.e once you click a burger item you HAVE to add it to order before returning to menu.

* No feedback when sides are added to order - Need to add a footer bar akin to when a burger is added to order.

* Removing items is buggy, cannot be done for toppings. This is a carry over from master branch which had a much simpler format. Can be addressed with more time.

* Some functions replicated in different components, can be corrected with more time.

* Some components are very similar - tried just having different classes, but wouuld cause styling to mess up

## Further Plans

* Some hang overs from master branch - most popular is now not entirely useful when burger options are simply bases for customisation. With more time I would have liked for it to display most popular topping combinations.
