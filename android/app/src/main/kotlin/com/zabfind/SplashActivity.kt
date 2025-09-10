package com.zabfind

import android.app.Activity
import android.os.Bundle
import android.content.Intent
import android.graphics.LinearGradient
import android.graphics.Shader
import android.graphics.Color
import android.view.View
import android.view.ViewTreeObserver
import android.animation.ObjectAnimator
import android.animation.AnimatorSet
import android.view.animation.AccelerateDecelerateInterpolator
import android.os.Handler
import android.os.Looper
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout

class SplashActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash)

        val tvZab = findViewById<TextView>(R.id.tv_zab)
        val tvSub = findViewById<TextView>(R.id.tv_sub)
        val root = findViewById<ConstraintLayout>(R.id.root)

        // Apply gradient to "ZAB" (horizontal from #0C54A3 to a lighter blue)
        tvZab.paint.shader = LinearGradient(
            0f, 0f, tvZab.paint.measureText(tvZab.text.toString()), 0f,
            intArrayOf(Color.parseColor("#0C54A3"), Color.parseColor("#4A90E2")),
            null, Shader.TileMode.CLAMP
        )

        // Apply gradient to "Lost & Find"
        tvSub.paint.shader = LinearGradient(
            0f, 0f, tvSub.paint.measureText(tvSub.text.toString()), 0f,
            intArrayOf(Color.parseColor("#0C54A3"), Color.parseColor("#4A90E2")),
            null, Shader.TileMode.CLAMP
        )

        // Create the dot view
        val dot = View(this)
        val params = ConstraintLayout.LayoutParams(20, 20) // Size of the dot
        dot.layoutParams = params
        dot.setBackgroundResource(R.drawable.dot)
        dot.visibility = View.INVISIBLE // Hide until positions are calculated
        root.addView(dot)

        // Calculate position after layout is drawn
        tvSub.viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                tvSub.viewTreeObserver.removeOnGlobalLayoutListener(this)

                val text = tvSub.text.toString()
                val findIndex = text.indexOf("Find")
                if (findIndex == -1) return // Safety check

                val iIndex = findIndex + 1 // Position of 'i' in "Find"
                val layout = tvSub.layout
                val x = layout.getPrimaryHorizontal(iIndex)
                val line = layout.getLineForOffset(iIndex)
                val baseline = layout.getLineBaseline(line)
                val ascent = tvSub.paint.fontMetrics.ascent // Negative value, used to position above 'i'

                // Target position for dot (centered above 'i')
                val targetX = (tvSub.left + x + (tvSub.paint.measureText("i") / 2) - 10).toFloat() // Center dot
                val targetY = (tvSub.top + baseline + ascent - 10).toFloat() // Above the 'i' stem

                // Initial position: bottom-left off-screen
                dot.translationX = -200f
                dot.translationY = root.height.toFloat() + 200f // From below
                dot.visibility = View.VISIBLE

                // Animate dot flying in
                val animX = ObjectAnimator.ofFloat(dot, "translationX", -200f, targetX)
                val animY = ObjectAnimator.ofFloat(dot, "translationY", root.height.toFloat() + 200f, targetY)
                animX.duration = 1500
                animY.duration = 1500
                animX.interpolator = AccelerateDecelerateInterpolator()
                animY.interpolator = AccelerateDecelerateInterpolator()

                val animatorSet = AnimatorSet()
                animatorSet.playTogether(animX, animY)
                animatorSet.start()

                // Transition to MainActivity after 2 seconds (adjust as needed)
                Handler(Looper.getMainLooper()).postDelayed({
                    startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                    finish()
                }, 2000)
            }
        })
    }
}